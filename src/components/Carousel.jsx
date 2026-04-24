import React, { useRef } from 'react';
import '../styles/Carousel.css';

const ICONS = {
  star: '<svg viewBox="0 0 24 24"><path fill="#f5c518" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
  starOutline: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"/></svg>',
  bookmarkOutline: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>',
  chevLeft: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
  chevRight: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>',
};

function MovieCard({ movie, onMovieClick }) {
  return (
    <div className="movie-card" onClick={() => onMovieClick(movie)}>
      <div className="movie-card-poster">
        <img src={movie.img} alt={movie.title} loading="lazy" />
        <div className="movie-card-bookmark" dangerouslySetInnerHTML={{ __html: ICONS.bookmarkOutline }} />
      </div>
      <div className="movie-card-info">
        <div className="movie-card-rating">
          <span className="star" dangerouslySetInnerHTML={{ __html: ICONS.star }} />
          <span>{movie.rating || '—'}</span>
          <button className="rate-btn" type="button" dangerouslySetInnerHTML={{ __html: ICONS.starOutline }} />
        </div>
        <div className="movie-card-title">{movie.title}</div>
        <div className="movie-card-trailer">
          <span dangerouslySetInnerHTML={{ __html: ICONS.play }} />
          Trailer
        </div>
      </div>
    </div>
  );
}

function Carousel({ movies, title, onMovieClick, isTopPicks = false }) {
  const trackRef = useRef(null);

  const handleScroll = (direction) => {
    if (trackRef.current) {
      const card = trackRef.current.querySelector('.movie-card');
      const scrollAmount = card ? card.offsetWidth + 12 : 192; // card width + gap
      trackRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {title && (
        <div className="section-header">
          <h2>{title}</h2>
          <a className="section-link" href="#/">
            See more
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </a>
        </div>
      )}
      {!isTopPicks && <p className="section-subtitle">This week's top Telugu & Tamil movies</p>}
      <div className="carousel-wrapper">
        <div className="carousel-track" ref={trackRef}>
          {movies.map((movie, idx) => (
            <MovieCard key={movie.id || idx} movie={movie} onMovieClick={onMovieClick} />
          ))}
        </div>
        <button className="carousel-btn prev" type="button" onClick={() => handleScroll('prev')}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button className="carousel-btn next" type="button" onClick={() => handleScroll('next')}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default Carousel;
