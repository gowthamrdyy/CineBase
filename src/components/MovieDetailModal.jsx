import React from 'react';
import '../styles/MovieDetailModal.css';

const ICONS = {
  star: '<svg viewBox="0 0 24 24"><path fill="#f5c518" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>',
  bookmarkOutline: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>',
};

function MovieDetailModal({ movie, onClose, isOpen }) {
  if (!isOpen || !movie) return null;

  return (
    <>
      <div className="movie-detail-overlay" onClick={onClose} />
      <div className="movie-detail-modal open">
        <button className="movie-detail-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
        <div className="movie-detail-backdrop">
          <img src={movie.img} alt={movie.title} />
          <div className="movie-detail-backdrop-fade"></div>
        </div>
        <div className="movie-detail-content">
          <div className="movie-detail-poster">
            <img src={movie.img} alt={movie.title} />
          </div>
          <div className="movie-detail-info">
            <h1 className="movie-detail-title">{movie.title}</h1>
            <div className="movie-detail-meta">
              <span className="movie-detail-year">{movie.year || ''}</span>
              <span className="movie-detail-genre">{movie.genre || movie.type || 'Movie'}</span>
            </div>
            <div className="movie-detail-rating-row">
              <div className="movie-detail-star" dangerouslySetInnerHTML={{ __html: ICONS.star }} />
              <span className="movie-detail-score">{movie.rating || '—'}</span>
              <span className="movie-detail-max">/10</span>
            </div>
            <p className="movie-detail-desc">
              {movie.desc || 'A critically acclaimed Indian film that captivated audiences across the nation with its powerful storytelling and stunning visuals.'}
            </p>
            <div className="movie-detail-actions">
              <button className="movie-detail-btn primary">
                <span dangerouslySetInnerHTML={{ __html: ICONS.play }} />
                Watch Trailer
              </button>
              <button className="movie-detail-btn secondary">
                <span dangerouslySetInnerHTML={{ __html: ICONS.bookmarkOutline }} />
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetailModal;
