import React, { useState } from 'react';
import { signInAsLocalAdmin, signInWithGoogle } from '../services/auth';
import { firebaseReady } from '../services/firebase';
import '../styles/SignInModal.css';

function SignInModal({ isOpen, onClose, onSignedIn = () => {} }) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setStatus('');

    try {
      const user = await signInWithGoogle();
      setStatus(`Signed in as ${user.displayName || user.email}`);
      onSignedIn(user);
      onClose();
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        setStatus('Google sign-in cancelled.');
      } else if (error.code === 'auth/unauthorized-domain') {
        setStatus('This domain is not authorized in Firebase Auth settings.');
      } else if (error.code === 'auth/operation-not-allowed') {
        setStatus('Enable Google provider in Firebase Authentication > Sign-in method.');
      } else {
        setStatus(error.message || 'Google sign-in failed.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocalAdminSignIn = async () => {
    setIsLoading(true);
    setStatus('');

    try {
      const user = await signInAsLocalAdmin();
      setStatus(`Signed in as ${user.displayName}`);
      onSignedIn(user);
      onClose();
    } catch (error) {
      setStatus(error.message || 'Local admin sign-in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="signin-modal-overlay open" onClick={onClose} />
      <div className="signin-modal open">
        <button className="signin-modal-close" type="button" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        <div className="signin-modal-logo">CineBase</div>
        <h2>Sign in to CineBase</h2>
        <p className="signin-modal-desc">Track your favourite Telugu & Tamil movies</p>
        <div className="signin-options">
          <button
            className="signin-option-btn google-btn"
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading || !firebaseReady}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            {isLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
          {!firebaseReady && (
            <button
              className="signin-option-btn admin-dev-btn"
              type="button"
              onClick={handleLocalAdminSignIn}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M12 1.75 4 5.25v5.8c0 5.08 3.42 9.83 8 11.2 4.58-1.37 8-6.12 8-11.2v-5.8l-8-3.5Zm0 2.18 6 2.63v4.49c0 4-2.48 7.77-6 9.08-3.52-1.31-6-5.08-6-9.08V6.56l6-2.63Zm-1 4.32v4.19l3.3 1.98.9-1.49-2.7-1.6V8.25H11Z" />
              </svg>
              Continue as Local Admin
            </button>
          )}
          <button className="signin-option-btn" type="button" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            Continue as Guest
          </button>
        </div>
        {status && <p className="signin-status">{status}</p>}
      </div>
    </>
  );
}

export default SignInModal;
