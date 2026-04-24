import { doc, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db, firebaseReady, missingFirebaseConfig } from './firebase';

const LOCAL_RATINGS_KEY = 'cinebase-local-ratings';

function isPermissionError(error) {
  return error?.code === 'permission-denied' || /insufficient permissions/i.test(error?.message || '');
}

function readLocalRatings() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_RATINGS_KEY) || '{}');
  } catch {
    return {};
  }
}

function writeLocalRatings(ratings) {
  localStorage.setItem(LOCAL_RATINGS_KEY, JSON.stringify(ratings));
}

function getLocalMovieRating(movieId, fallbackRating) {
  const rating = readLocalRatings()[movieId];
  if (!rating) {
    return { average: fallbackRating, votes: 0, configured: false };
  }

  return {
    average: Number(rating.average || fallbackRating),
    votes: Number(rating.totalVotes || 0),
    configured: false,
  };
}

function submitLocalMovieRating(movieId, value) {
  const ratings = readLocalRatings();
  const previous = ratings[movieId] || { totalScore: 0, totalVotes: 0, average: 0 };
  const totalScore = Number(previous.totalScore || 0) + value;
  const totalVotes = Number(previous.totalVotes || 0) + 1;

  ratings[movieId] = {
    totalScore,
    totalVotes,
    average: Number((totalScore / totalVotes).toFixed(1)),
    updatedAt: new Date().toISOString(),
  };
  writeLocalRatings(ratings);
}

export async function fetchMovieRating(movieId, fallbackRating) {
  if (!firebaseReady || !db) {
    return getLocalMovieRating(movieId, fallbackRating);
  }

  try {
    const ratingRef = doc(db, 'movieRatings', movieId);
    const snap = await getDoc(ratingRef);

    if (!snap.exists()) {
      return { average: fallbackRating, votes: 0, configured: true };
    }

    const data = snap.data();
    return {
      average: Number(data.average || fallbackRating),
      votes: Number(data.totalVotes || 0),
      configured: true,
    };
  } catch (error) {
    if (isPermissionError(error)) {
      return getLocalMovieRating(movieId, fallbackRating);
    }
    throw error;
  }
}

export async function submitMovieRating(movieId, value) {
  if (!firebaseReady || !db) {
    if (missingFirebaseConfig.length) {
      submitLocalMovieRating(movieId, value);
      return;
    }
    throw new Error(`Firebase is not configured. Missing: ${missingFirebaseConfig.join(', ')}`);
  }

  const ratingRef = doc(db, 'movieRatings', movieId);

  try {
    await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(ratingRef);
      const previousTotalScore = snap.exists() ? Number(snap.data().totalScore || 0) : 0;
      const previousTotalVotes = snap.exists() ? Number(snap.data().totalVotes || 0) : 0;

      const totalScore = previousTotalScore + value;
      const totalVotes = previousTotalVotes + 1;
      const average = Number((totalScore / totalVotes).toFixed(1));

      transaction.set(
        ratingRef,
        { totalScore, totalVotes, average, updatedAt: serverTimestamp() },
        { merge: true }
      );
    });
  } catch (error) {
    if (isPermissionError(error)) {
      submitLocalMovieRating(movieId, value);
      return;
    }
    throw error;
  }
}
