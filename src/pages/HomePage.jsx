import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import Carousel from '../components/Carousel';
import SignInModal from '../components/SignInModal';
import BoxOffice from '../components/BoxOffice';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import useAuthUser from '../hooks/useAuthUser';
import useImageConfig from '../hooks/useImageConfig';
import { getImageUrl } from '../services/imageConfig';
import { signOutUser } from '../services/auth';
import '../styles/App.css';
import '../styles/Global.css';

// Map image config entries to the shape the existing components expect
function toMovieShape(entry) {
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

function toTrendingShape(entry) {
  return {
    id: (entry.title || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `img-${entry.imgNum}`,
    title: entry.title || `Movie #${entry.imgNum}`,
    img: getImageUrl(entry.imgNum),
    year: entry.year || 2024,
    rating: entry.rating || 7.0,
    genre: entry.genre || 'Movie',
    type: 'Movie',
  };
}

const BOX_OFFICE_DATA = [
  { rank: 1, title: 'Kalki 2898 AD', weekend: '₹105 Cr', total: '₹1200 Cr+', weeks: 12 },
  { rank: 2, title: 'Devara: Part 1', weekend: '₹82 Cr', total: '₹510 Cr+', weeks: 4 },
  { rank: 3, title: 'Hanu-Man', weekend: '₹55 Cr', total: '₹350 Cr+', weeks: 15 },
  { rank: 4, title: 'Tillu Square', weekend: '₹25 Cr', total: '₹135 Cr+', weeks: 8 },
  { rank: 5, title: 'Salaar: Part 1 - Ceasefire', weekend: '₹145 Cr', total: '₹715 Cr+', weeks: 10 },
];

function HomePage() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthUser();
  const config = useImageConfig();

  const heroMovies = (config.hero || []).slice(0, config.heroLimit || 5).map(toMovieShape);
  const fanFavorites = (config.fanFavorites || []).map(toMovieShape);
  const topPicks = (config.topPicks || []).map(toMovieShape);
  const trending = (config.trending || []).map(toTrendingShape);

  // Build allMovies for search from all sections
  const allMoviesMap = new Map();
  [...heroMovies, ...fanFavorites, ...topPicks, ...trending].forEach(m => {
    if (!allMoviesMap.has(m.id)) allMoviesMap.set(m.id, m);
  });
  const allMovies = Array.from(allMoviesMap.values());

  const handleMovieClick = (movie) => {
    if (!movie?.id) return;
    navigate(`/movie/${movie.id}`);
  };

  const handleSignOut = async () => {
    await signOutUser();
  };

  return (
    <div className="App">
      <Navbar
        onMenuToggle={() => {}}
        onSignInClick={() => setIsSignInOpen(true)}
        onWatchlistClick={() => setIsSignInOpen(true)}
        movieOptions={allMovies}
        onMovieSelect={handleMovieClick}
        currentUser={user}
        isAdmin={isAdmin}
        onSignOut={handleSignOut}
      />

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />

      <div className="main-container">
        <div className="content-area">
          <HeroSlider featured={heroMovies} onMovieClick={handleMovieClick} />

          <section className="what-to-watch">
            <div className="section-header">
              <h2>What to watch</h2>
            </div>
            <div className="tabs">
              <button className="tab-btn active">Fan Favorites</button>
              <button className="tab-btn">Top Picks</button>
            </div>
            <Carousel movies={fanFavorites} onMovieClick={handleMovieClick} />
          </section>

          <Carousel
            title="Top picks"
            movies={topPicks}
            onMovieClick={handleMovieClick}
            isTopPicks
          />

          <Carousel
            title="Most popular movies"
            movies={trending}
            onMovieClick={handleMovieClick}
          />

          <BoxOffice boxOfficeData={BOX_OFFICE_DATA} />
        </div>

        <Sidebar movies={fanFavorites.slice(0, 5)} onMovieClick={handleMovieClick} />
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
