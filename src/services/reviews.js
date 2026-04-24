import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db, firebaseReady, missingFirebaseConfig } from './firebase';

const LOCAL_REVIEWS_KEY = 'cinebase-local-reviews';
const LOCAL_REVIEWS_EVENT = 'cinebase-local-reviews-change';

function isPermissionError(error) {
  return error?.code === 'permission-denied' || /insufficient permissions/i.test(error?.message || '');
}

function ensureFirebaseReady() {
  if (!firebaseReady || !db) {
    throw new Error(`Firebase is not configured. Missing: ${missingFirebaseConfig.join(', ')}`);
  }
}

function readLocalReviews() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_REVIEWS_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeLocalReviews(reviewsByMovie) {
  localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(reviewsByMovie));
  window.dispatchEvent(new Event(LOCAL_REVIEWS_EVENT));
}

function getMovieLocalReviews(movieId) {
  return (readLocalReviews()[movieId] || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function addLocalMovieReview(movieId, user, text) {
  const reviewsByMovie = readLocalReviews();
  const review = {
    id: `${Date.now()}-${user.uid}`,
    text,
    uid: user.uid,
    userName: user.displayName || user.email || 'Anonymous',
    userPhotoURL: user.photoURL || '',
    createdAt: new Date().toISOString(),
  };
  reviewsByMovie[movieId] = [review, ...(reviewsByMovie[movieId] || [])];
  writeLocalReviews(reviewsByMovie);
}

export function subscribeMovieReviews(movieId, onChange, onError) {
  const emitLocalReviews = () => onChange(movieId ? getMovieLocalReviews(movieId) : []);

  if (!firebaseReady || !db || !movieId) {
    emitLocalReviews();
    window.addEventListener(LOCAL_REVIEWS_EVENT, emitLocalReviews);
    window.addEventListener('storage', emitLocalReviews);
    return () => {
      window.removeEventListener(LOCAL_REVIEWS_EVENT, emitLocalReviews);
      window.removeEventListener('storage', emitLocalReviews);
    };
  }

  const reviewsRef = collection(db, 'movieRatings', movieId, 'reviews');
  const reviewsQuery = query(reviewsRef, orderBy('createdAt', 'desc'));

  window.addEventListener(LOCAL_REVIEWS_EVENT, emitLocalReviews);
  window.addEventListener('storage', emitLocalReviews);

  const unsubscribeFirestore = onSnapshot(
    reviewsQuery,
    (snapshot) => {
      const reviews = snapshot.docs.map((reviewDoc) => ({ id: reviewDoc.id, ...reviewDoc.data() }));
      onChange(reviews);
    },
    (error) => {
      if (isPermissionError(error)) {
        emitLocalReviews();
        return;
      }
      onError(error);
    }
  );

  return () => {
    unsubscribeFirestore();
    window.removeEventListener(LOCAL_REVIEWS_EVENT, emitLocalReviews);
    window.removeEventListener('storage', emitLocalReviews);
  };
}

export async function submitMovieReview(movieId, user, reviewText) {
  if (!user?.uid) {
    throw new Error('Please sign in to post a review.');
  }

  const text = reviewText.trim();
  if (!text) {
    throw new Error('Review text cannot be empty.');
  }

  if (!firebaseReady || !db) {
    addLocalMovieReview(movieId, user, text);
    return;
  }

  ensureFirebaseReady();

  try {
    await addDoc(collection(db, 'movieRatings', movieId, 'reviews'), {
      text,
      uid: user.uid,
      userName: user.displayName || user.email || 'Anonymous',
      userPhotoURL: user.photoURL || '',
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    if (isPermissionError(error)) {
      addLocalMovieReview(movieId, user, text);
      return;
    }
    throw error;
  }
}
