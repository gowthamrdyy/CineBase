import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db, firebaseReady, googleProvider, missingFirebaseConfig } from './firebase';

const LOCAL_AUTH_KEY = 'cinebase-local-user';
const LOCAL_AUTH_EVENT = 'cinebase-local-auth-change';

const adminEmails = (process.env.REACT_APP_ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function isPermissionError(error) {
  return error?.code === 'permission-denied' || /insufficient permissions/i.test(error?.message || '');
}

function getLocalUser() {
  try {
    const storedUser = localStorage.getItem(LOCAL_AUTH_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
}

function emitLocalAuthChange() {
  window.dispatchEvent(new Event(LOCAL_AUTH_EVENT));
}

export async function signInWithGoogle() {
  if (!firebaseReady || !auth || !googleProvider) {
    throw new Error(`Firebase is not configured. Missing: ${missingFirebaseConfig.join(', ')}`);
  }

  const credential = await signInWithPopup(auth, googleProvider);
  const user = credential.user;

  if (db) {
    try {
      await setDoc(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || '',
          lastLoginAt: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      if (!isPermissionError(error)) {
        throw error;
      }
    }
  }

  return user;
}

export async function signInAsLocalAdmin() {
  const user = {
    uid: 'local-admin',
    email: 'local.admin@cinebase.dev',
    displayName: 'Local Admin',
    photoURL: '',
    isLocalAdmin: true,
  };
  localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(user));
  emitLocalAuthChange();
  return user;
}

export async function signOutUser() {
  localStorage.removeItem(LOCAL_AUTH_KEY);
  emitLocalAuthChange();
  if (!auth) return;
  await signOut(auth);
}

export function observeAuthState(callback) {
  if (!auth) {
    callback(getLocalUser());
    const handleLocalAuthChange = () => callback(getLocalUser());
    window.addEventListener(LOCAL_AUTH_EVENT, handleLocalAuthChange);
    window.addEventListener('storage', handleLocalAuthChange);
    return () => {
      window.removeEventListener(LOCAL_AUTH_EVENT, handleLocalAuthChange);
      window.removeEventListener('storage', handleLocalAuthChange);
    };
  }

  return onAuthStateChanged(auth, (user) => {
    callback(user || getLocalUser());
  });
}

export function isAdminUser(user) {
  if (user?.isLocalAdmin) return true;
  if (!user?.email) return false;
  if (adminEmails.length === 0) return true;
  return adminEmails.includes(user.email.toLowerCase());
}
