import React from 'react';
import '../styles/Sidebar.css';

const ICONS = {
  star: '<svg viewBox="0 0 24 24"><path fill="#f5c518" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>',
};

function Sidebar({ movies, onMovieClick = () => {} }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-box" style={{ marginTop: 0 }}>
        <h3>More to watch</h3>
        <div>
          {movies.map((movie, idx) => (
            <div key={idx} className="sidebar-list-item" onClick={() => onMovieClick(movie)}>
              <img src={movie.img} alt={movie.title} />
              <div className="sidebar-list-info">
                <div className="sidebar-list-title">{movie.title}</div>
                <div className="sidebar-list-meta">
                  {movie.year} ·
                  <span dangerouslySetInnerHTML={{ __html: ICONS.star }} />
                  {movie.rating}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sidebar-box">
        <h3>Recently viewed</h3>
        <p style={{ fontSize: '13px', color: 'var(--imdb-text-dim)' }}>
          Sign in to see your recently viewed titles.
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
