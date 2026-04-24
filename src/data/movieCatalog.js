import { MOVIES } from './movies';

const MOVIE_DETAILS = {
  'baahubali-2-the-conclusion': { runtime: '2h 47m', language: 'Telugu' },
  rrr: { runtime: '3h 2m', language: 'Telugu' },
  vikram: { runtime: '2h 55m', language: 'Tamil' },
  'kalki-2898-ad': { runtime: '3h 1m', language: 'Telugu' },
  'pushpa-the-rise': { runtime: '2h 59m', language: 'Telugu' },
};

const CATEGORY_DEFAULTS = {
  featured: { type: 'Movie', genre: 'Action, Drama' },
  fanFavorites: { type: 'Movie', genre: 'Action, Drama' },
  topPicks: { type: 'Movie', genre: 'Drama' },
  trending: { type: 'Movie', genre: 'Action' },
};

export function toMovieId(title = '') {
  return title
    .toLowerCase()
    .replace(/[:']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function fallbackDescription(title) {
  return `${title} is one of the most talked-about Indian titles on CineBase, known for strong performances, big-screen visuals, and crowd-pleasing storytelling.`;
}

function toNumberRating(value) {
  if (typeof value === 'number') return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 7;
}

function mergeMovie(existing = {}, movie = {}, defaults = {}) {
  const title = movie.title || existing.title || 'Untitled';
  const id = toMovieId(title);
  const detail = MOVIE_DETAILS[id] || {};

  return {
    id,
    title,
    year: movie.year ?? existing.year ?? 2024,
    genre: movie.genre || existing.genre || defaults.genre || 'Drama',
    type: movie.type || existing.type || defaults.type || 'Movie',
    rating: toNumberRating(movie.rating ?? existing.rating ?? 7),
    img: movie.img || existing.img,
    desc: movie.desc || existing.desc || fallbackDescription(title),
    runtime: movie.runtime || existing.runtime || detail.runtime || '2h 20m',
    language: movie.language || existing.language || detail.language || 'Indian',
  };
}

const categoryNames = ['featured', 'fanFavorites', 'topPicks', 'trending'];
const movieMap = new Map();

categoryNames.forEach((categoryName) => {
  const categoryMovies = MOVIES[categoryName] || [];
  categoryMovies.forEach((movie) => {
    if (!movie?.title) return;
    const id = toMovieId(movie.title);
    const merged = mergeMovie(movieMap.get(id), movie, CATEGORY_DEFAULTS[categoryName]);
    movieMap.set(id, merged);
  });
});

const catalog = Array.from(movieMap.values());

export const allMovies = catalog;
export const moviesById = Object.fromEntries(catalog.map((movie) => [movie.id, movie]));

export function getMovieById(movieId) {
  return moviesById[movieId] || null;
}

function normalizeList(list = []) {
  return list
    .map((movie) => moviesById[toMovieId(movie.title)])
    .filter(Boolean);
}

export const normalizedMovies = {
  featured: normalizeList(MOVIES.featured),
  fanFavorites: normalizeList(MOVIES.fanFavorites),
  topPicks: normalizeList(MOVIES.topPicks),
  trending: normalizeList(MOVIES.trending),
  boxOffice: MOVIES.boxOffice,
  bornToday: MOVIES.bornToday,
};
