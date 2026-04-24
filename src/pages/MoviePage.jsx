import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SignInModal from '../components/SignInModal';
import useAuthUser from '../hooks/useAuthUser';
import useImageConfig from '../hooks/useImageConfig';
import { getImageUrl } from '../services/imageConfig';
import { submitMovieReview, subscribeMovieReviews } from '../services/reviews';
import { fetchMovieRating, submitMovieRating } from '../services/ratings';
import { firebaseReady } from '../services/firebase';
import { signOutUser } from '../services/auth';
import '../styles/MoviePage.css';
import '../styles/Global.css';

function formatReviewDate(createdAt) {
  if (!createdAt) return 'Just now';
  const date =
    typeof createdAt?.toDate === 'function'
      ? createdAt.toDate()
      : createdAt instanceof Date
      ? createdAt
      : typeof createdAt === 'string'
      ? new Date(createdAt)
      : null;
  return date ? date.toLocaleString() : 'Just now';
}

function toMovieShape(entry) {
  if (!entry) return null;
  return {
    id: (entry.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `img-${entry.imgNum}`,
    title: entry.title || `Movie #${entry.imgNum}`,
    year: entry.year || 2024,
    genre: entry.genre || 'Movie',
    rating: entry.rating || 7.0,
    img: getImageUrl(entry.imgNum),
    desc: entry.desc || '',
    runtime: entry.runtime || '2h 20m',
    language: entry.language || 'Indian',
    type: 'Movie',
  };
}

function MoviePage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const { user, isAdmin } = useAuthUser();
  const config = useImageConfig();

  const allEntries = [
    ...(config.hero || []),
    ...(config.fanFavorites || []),
    ...(config.topPicks || []),
    ...(config.trending || []),
  ];
  
  const movie = useMemo(() => {
    const found = allEntries.find(e => {
      const id = (e.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `img-${e.imgNum}`;
      return id === movieId;
    });
    return toMovieShape(found);
  }, [config, movieId]);

  const allMovies = useMemo(() => allEntries.map(toMovieShape), [config]);

  const [ratingData, setRatingData] = useState({ average: movie?.rating || 0, votes: 0, configured: firebaseReady });
  const [selectedRating, setSelectedRating] = useState(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [ratingMessage, setRatingMessage] = useState('');

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');

  const [hasRated, setHasRated] = useState(false);
  const ratingStorageKey = user?.uid ? `rated-movie-${movieId}-${user.uid}` : `rated-movie-${movieId}-guest`;

  useEffect(() => {
    setHasRated(Boolean(localStorage.getItem(ratingStorageKey)));
    setSelectedRating(0);
    setRatingMessage('');
  }, [ratingStorageKey]);

  useEffect(() => {
    if (!movie) return;

    let active = true;
    fetchMovieRating(movie.id, movie.rating)
      .then((data) => {
        if (active) setRatingData(data);
      })
      .catch((error) => {
        if (!active) return;
        setRatingData((previous) => ({ ...previous, configured: firebaseReady }));
        if (error.code === 'permission-denied') {
          setRatingMessage('Firestore blocked this request. Sign in and verify rules for movieRatings.');
        } else {
          setRatingMessage(error.message);
        }
      });

    return () => {
      active = false;
    };
  }, [movie]);

  useEffect(() => {
    if (!movie?.id) {
      setReviews([]);
      return undefined;
    }

    return subscribeMovieReviews(
      movie.id,
      (nextReviews) => setReviews(nextReviews),
      (error) => setReviewMessage(error.message || 'Unable to load reviews.')
    );
  }, [movie?.id]);

  const handleSubmitRating = async () => {
    if (!selectedRating) {
      setRatingMessage('Pick a score from 1 to 10.');
      return;
    }

    if (!user) {
      setRatingMessage('Sign in to rate this title.');
      setIsSignInOpen(true);
      return;
    }

    if (hasRated) {
      setRatingMessage('You already rated this movie with this profile.');
      return;
    }

    setIsSubmittingRating(true);
    setRatingMessage('');

    try {
      await submitMovieRating(movie.id, selectedRating);
      const updated = await fetchMovieRating(movie.id, movie.rating);
      setRatingData(updated);
      localStorage.setItem(ratingStorageKey, String(selectedRating));
      setHasRated(true);
      setRatingMessage('Rating submitted successfully.');
    } catch (error) {
      if (error.code === 'permission-denied') {
        setRatingMessage('Firestore blocked writes. Confirm movieRatings rules allow authenticated writes.');
      } else {
        setRatingMessage(error.message);
      }
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!movie) return;
    if (!user) {
      setReviewMessage('Sign in to post reviews.');
      setIsSignInOpen(true);
      return;
    }
    if (!reviewText.trim()) {
      setReviewMessage('Write a short review before posting.');
      return;
    }

    setIsSubmittingReview(true);
    setReviewMessage('');
    try {
      await submitMovieReview(movie.id, user, reviewText);
      setReviewText('');
      setReviewMessage('Review posted.');
    } catch (error) {
      if (error.code === 'permission-denied') {
        setReviewMessage('Firestore blocked review writes. Update rules for movieRatings/{movieId}/reviews.');
      } else {
        setReviewMessage(error.message || 'Unable to submit review.');
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
    setRatingMessage('Signed out.');
  };

  if (!movie) {
    return (
      <div className="movie-page-root">
        <Navbar
          movieOptions={allMovies}
          onMovieSelect={(selectedMovie) => navigate(`/movie/${selectedMovie.id}`)}
          currentUser={user}
          isAdmin={isAdmin}
          onSignOut={handleSignOut}
          onSignInClick={() => setIsSignInOpen(true)}
          onWatchlistClick={() => setIsSignInOpen(true)}
        />
        <main className="movie-not-found">
          <h1>Movie not found</h1>
          <p>This title may have been removed or does not exist.</p>
          <Link to="/">Go back home</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="movie-page-root">
      <Navbar
        movieOptions={allMovies}
        onMovieSelect={(selectedMovie) => navigate(`/movie/${selectedMovie.id}`)}
        currentUser={user}
        isAdmin={isAdmin}
        onSignOut={handleSignOut}
        onSignInClick={() => setIsSignInOpen(true)}
        onWatchlistClick={() => setIsSignInOpen(true)}
      />
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignedIn={() => setReviewMessage('Profile active. You can now comment and rate.')}
      />

      <main className="movie-page">
        <section className="movie-hero">
          <img src={movie.img} alt={movie.title} className="movie-hero-bg" />
          <div className="movie-hero-overlay" />
          <div className="movie-hero-content">
            <Link to="/" className="movie-back-link">
              ← Back to Home
            </Link>
            <div className="movie-main-grid">
              <img src={movie.img} alt={movie.title} className="movie-poster" />
              <div className="movie-main-info">
                <h1>{movie.title}</h1>
                <p className="movie-meta">
                  {movie.year} • {movie.runtime} • {movie.language} • {movie.genre}
                </p>
                <div className="movie-rating-cards">
                  <div className="rating-card">
                    <span className="rating-label">CineBase score</span>
                    <strong>{Number(movie.rating).toFixed(1)}/10</strong>
                  </div>
                  <div className="rating-card">
                    <span className="rating-label">Community score</span>
                    <strong>{Number(ratingData.average || movie.rating).toFixed(1)}/10</strong>
                    <small>{ratingData.votes} votes</small>
                  </div>
                </div>
                {!firebaseReady && (
                  <p className="rating-warning">Firebase env values are missing, so live sync features are disabled.</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="movie-body-grid">
          <div className="movie-main-column">
            <article className="movie-panel">
              <h2>Storyline</h2>
              <p className="movie-description">{movie.desc}</p>
            </article>

            <article className="movie-panel">
              <h2>Details</h2>
              <div className="movie-details-grid">
                <div>
                  <span>Type</span>
                  <strong>{movie.type}</strong>
                </div>
                <div>
                  <span>Genre</span>
                  <strong>{movie.genre}</strong>
                </div>
                <div>
                  <span>Language</span>
                  <strong>{movie.language}</strong>
                </div>
                <div>
                  <span>Runtime</span>
                  <strong>{movie.runtime}</strong>
                </div>
              </div>
            </article>

            <article className="movie-panel">
              <div className="movie-panel-heading">
                <div>
                  <span>Community</span>
                  <h2>Comments and reviews</h2>
                </div>
                <strong>{reviews.length}</strong>
              </div>
              <div className="review-form">
                <textarea
                  value={reviewText}
                  onChange={(event) => setReviewText(event.target.value)}
                  placeholder={user ? 'Write your comment or review...' : 'Sign in to comment on this movie...'}
                  rows={4}
                />
                <button type="button" onClick={handleSubmitReview} disabled={isSubmittingReview}>
                  {isSubmittingReview ? 'Posting...' : 'Post comment'}
                </button>
              </div>
              {reviewMessage && <p className="rating-message">{reviewMessage}</p>}
              <div className="reviews-list">
                {reviews.length === 0 ? (
                  <p className="reviews-empty">No reviews yet. Be the first reviewer.</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        {review.userPhotoURL ? (
                          <img src={review.userPhotoURL} alt={review.userName} />
                        ) : (
                          <span>{(review.userName || 'U').slice(0, 1).toUpperCase()}</span>
                        )}
                        <div>
                          <strong>{review.userName || 'Anonymous'}</strong>
                          <small>{formatReviewDate(review.createdAt)}</small>
                        </div>
                      </div>
                      <p>{review.text}</p>
                    </div>
                  ))
                )}
              </div>
            </article>
          </div>

          <aside className="movie-side-column">
            <section className="movie-rating-panel">
              <h2>Rate this movie</h2>
              <p>Choose your score from 1 to 10.</p>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <button
                    key={value}
                    className={`rating-number-btn ${selectedRating === value ? 'active' : ''}`}
                    onClick={() => setSelectedRating(value)}
                    disabled={hasRated}
                    type="button"
                  >
                    {value}
                  </button>
                ))}
              </div>
              <button
                className="submit-rating-btn"
                type="button"
                onClick={handleSubmitRating}
                disabled={isSubmittingRating || hasRated}
              >
                {hasRated ? 'Already Rated' : isSubmittingRating ? 'Submitting...' : 'Submit Rating'}
              </button>
              {ratingMessage && <p className="rating-message">{ratingMessage}</p>}
            </section>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MoviePage;
