import React, { useState, useEffect } from 'react';
import '../styles/HeroSlider.css';

const ICONS = {
  chevLeft: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>',
  chevRight: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>',
  bookmarkOutline: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/></svg>',
};

function HeroSlider({ featured, onMovieClick }) {
  const [heroIndex, setHeroIndex] = useState(0);
  const len = featured.length;

  useEffect(() => {
    if (!len) return undefined;
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % len);
    }, 6000);
    return () => clearInterval(interval);
  }, [len]);

  if (!len) {
    return (
      <section className="hero-section hero-section-empty">
        <div className="hero-overlay">
          <div className="hero-badge">CineBase</div>
          <div className="hero-title">No featured movies yet</div>
          <div className="hero-subtitle">Add titles from the admin console to build your homepage.</div>
        </div>
      </section>
    );
  }

  const movie = featured[heroIndex];

  return (
    <section className="hero-section">
      <div className="hero-bg">
        <img src={movie.img} alt={movie.title} />
        <div className="hero-gradient"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">{(movie.genre || 'Movie').split(',')[0]}</div>
        <div className="hero-title">{movie.title}</div>
        <div className="hero-subtitle">{movie.desc}</div>
        <div className="hero-meta">
          <span>★ {movie.rating}</span>
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
        </div>
        <div className="hero-btns">
          <button className="hero-btn-primary" type="button" onClick={() => onMovieClick(movie)}>
            <span dangerouslySetInnerHTML={{ __html: ICONS.play }} />
            Watch Trailer
          </button>
          <button className="hero-btn-secondary" type="button">
            <span dangerouslySetInnerHTML={{ __html: ICONS.bookmarkOutline }} />
            Watchlist
          </button>
        </div>
      </div>

      <button className="hero-nav prev" type="button" onClick={() => setHeroIndex((prev) => (prev - 1 + len) % len)} dangerouslySetInnerHTML={{ __html: ICONS.chevLeft }} />
      <button className="hero-nav next" type="button" onClick={() => setHeroIndex((prev) => (prev + 1) % len)} dangerouslySetInnerHTML={{ __html: ICONS.chevRight }} />
      
      <div className="hero-dots">
        {featured.map((_, i) => (
          <span key={i} className={`hero-dot ${i === heroIndex ? 'active' : ''}`} onClick={() => setHeroIndex(i)} />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;
