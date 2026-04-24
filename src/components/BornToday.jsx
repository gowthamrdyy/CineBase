import React, { useRef } from 'react';
import '../styles/BornToday.css';

function BornToday({ celebrities }) {
  const trackRef = useRef(null);

  const handleScroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = 600;
      trackRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="section-header">
        <h2>Born today</h2>
        <a className="section-link" href="#/">
          See more
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </a>
      </div>
      <div className="carousel-wrapper">
        <div className="born-today-track" ref={trackRef}>
          {celebrities.map((person, idx) => (
            <div key={idx} className="born-card">
              <div className="born-card-avatar">
                <img src={person.img} alt={person.name} loading="lazy" />
              </div>
              <div className="born-card-name">{person.name}</div>
              <div className="born-card-age">{person.age} years old</div>
            </div>
          ))}
        </div>
        <button className="carousel-btn prev" onClick={() => handleScroll('prev')}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <button className="carousel-btn next" onClick={() => handleScroll('next')}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
          </svg>
        </button>
      </div>
    </>
  );
}

export default BornToday;
