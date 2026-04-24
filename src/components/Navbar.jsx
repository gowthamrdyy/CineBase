import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({
  onMenuToggle = () => {},
  onSignInClick = () => {},
  onWatchlistClick = () => {},
  movieOptions = [],
  onMovieSelect = () => {},
  currentUser = null,
  isAdmin = false,
  onSignOut = () => {},
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];
    return movieOptions
      .filter((movie) => movie.title.toLowerCase().includes(normalizedQuery))
      .slice(0, 6);
  }, [query, movieOptions]);

  const handleResultClick = (movie) => {
    onMovieSelect(movie);
    setQuery('');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <div className="nav-logo" onClick={() => navigate('/')}>CineBase</div>
        <button className="nav-menu-btn" onClick={onMenuToggle}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
          </svg>
          Menu
        </button>
        <div className="nav-search">
          <select className="nav-search-cat">
            <option>All</option>
            <option>Telugu</option>
            <option>Tamil</option>
            <option>Celebs</option>
          </select>
          <input
            type="text"
            id="search-input"
            placeholder="Search Telugu & Tamil movies..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button className="nav-search-btn" type="button">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
          <div className={`search-results ${searchResults.length > 0 ? 'open' : ''}`} id="search-results">
            {searchResults.map((movie) => (
              <div key={movie.id} className="search-result-item" onClick={() => handleResultClick(movie)}>
                <img src={movie.img} alt={movie.title} />
                <div className="search-result-info">
                  <div className="search-result-title">{movie.title}</div>
                  <div className="search-result-meta">{movie.year} • {movie.genre}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="nav-right">
          {isAdmin && (
            <button className="nav-icon-btn nav-admin-btn" type="button" onClick={() => navigate('/admin')}>
              Admin
            </button>
          )}
          <button className="nav-icon-btn" type="button" onClick={onWatchlistClick}>
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z" />
            </svg>
            Watchlist
          </button>
          <div className="nav-divider"></div>
          {currentUser ? (
            <div className="nav-user-profile">
              <button className="nav-user-chip" type="button" title={currentUser.email || currentUser.displayName || 'User'}>
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt={currentUser.displayName || 'User'} />
                ) : (
                  <span>{(currentUser.displayName || currentUser.email || 'U').slice(0, 1).toUpperCase()}</span>
                )}
                <strong>{(currentUser.displayName || 'Profile').split(' ')[0]}</strong>
              </button>
              <button className="nav-signout" type="button" onClick={onSignOut}>Sign out</button>
            </div>
          ) : (
            <button className="nav-signin" type="button" onClick={onSignInClick}>Sign In</button>
          )}
          <button className="nav-icon-btn nav-lang">IN</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
