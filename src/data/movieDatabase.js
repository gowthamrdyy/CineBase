/**
 * movieDatabase.js
 *
 * Enriched relational data for CineBase movies — mirrors the SQL schema.
 * Provides director, cast/actors, and genre data for each movie.
 * Keyed by the same slug IDs used throughout the app.
 */

// ── Directors ────────────────────────────────────────────────────────────────
export const DIRECTORS = {
  1:  { id: 1,  name: 'Rishab Shetty',        birthYear: 1983, nationality: 'Indian' },
  2:  { id: 2,  name: 'A. Harsha',            birthYear: 1985, nationality: 'Indian' },
  3:  { id: 3,  name: 'Sandeep Reddy Vanga',  birthYear: 1987, nationality: 'Indian' },
  4:  { id: 4,  name: 'K. Viswanath',         birthYear: 1930, nationality: 'Indian' },
  5:  { id: 5,  name: 'Parasuram',            birthYear: 1983, nationality: 'Indian' },
  6:  { id: 6,  name: 'Sukumar',              birthYear: 1970, nationality: 'Indian' },
  7:  { id: 7,  name: 'Vineeth Sreenivasan',  birthYear: 1985, nationality: 'Indian' },
  8:  { id: 8,  name: 'Hanu Raghavapudi',     birthYear: 1984, nationality: 'Indian' },
  9:  { id: 9,  name: 'Girish A.D.',          birthYear: 1988, nationality: 'Indian' },
  10: { id: 10, name: 'Gowtam Tinnanuri',     birthYear: 1987, nationality: 'Indian' },
  11: { id: 11, name: 'Surender Reddy',       birthYear: 1971, nationality: 'Indian' },
  12: { id: 12, name: 'S.S. Rajamouli',       birthYear: 1973, nationality: 'Indian' },
  13: { id: 13, name: 'Gautham Vasudev Menon', birthYear: 1972, nationality: 'Indian' },
  14: { id: 14, name: 'Harish Shankar',       birthYear: 1979, nationality: 'Indian' },
  15: { id: 15, name: 'Shouryuv',             birthYear: 1990, nationality: 'Indian' },
  16: { id: 16, name: 'C. Prem Kumar',        birthYear: 1978, nationality: 'Indian' },
};

// ── Actors ───────────────────────────────────────────────────────────────────
export const ACTORS = {
  1:  { id: 1,  name: 'Rishab Shetty',          birthYear: 1983, gender: 'Male' },
  2:  { id: 2,  name: 'Vijay Deverakonda',      birthYear: 1989, gender: 'Male' },
  3:  { id: 3,  name: 'Chiranjeevi',            birthYear: 1955, gender: 'Male' },
  4:  { id: 4,  name: 'Rashmika Mandanna',      birthYear: 1996, gender: 'Female' },
  5:  { id: 5,  name: 'Ram Charan',             birthYear: 1985, gender: 'Male' },
  6:  { id: 6,  name: 'Samantha Ruth Prabhu',   birthYear: 1987, gender: 'Female' },
  7:  { id: 7,  name: 'Pranav Mohanlal',        birthYear: 1990, gender: 'Male' },
  8:  { id: 8,  name: 'Dulquer Salmaan',        birthYear: 1986, gender: 'Male' },
  9:  { id: 9,  name: 'Mrunal Thakur',          birthYear: 1992, gender: 'Female' },
  10: { id: 10, name: 'Nassar',                 birthYear: 1958, gender: 'Male' },
  11: { id: 11, name: 'Nani',                   birthYear: 1984, gender: 'Male' },
  12: { id: 12, name: 'Allu Arjun',             birthYear: 1983, gender: 'Male' },
  13: { id: 13, name: 'Pawan Kalyan',           birthYear: 1971, gender: 'Male' },
  14: { id: 14, name: 'Sai Pallavi',            birthYear: 1992, gender: 'Female' },
  15: { id: 15, name: 'Trisha',                 birthYear: 1983, gender: 'Female' },
  16: { id: 16, name: 'Sapthami Gowda',         birthYear: 1997, gender: 'Female' },
  17: { id: 17, name: 'Shalini Pandey',         birthYear: 1993, gender: 'Female' },
  18: { id: 18, name: 'Shruti Marathe',         birthYear: 1987, gender: 'Female' },
  19: { id: 19, name: 'Kalyani Priyadarshan',   birthYear: 1992, gender: 'Female' },
  20: { id: 20, name: 'Darshana Rajendran',     birthYear: 1993, gender: 'Female' },
  21: { id: 21, name: 'Naslen K. Gafoor',       birthYear: 1999, gender: 'Male' },
  22: { id: 22, name: 'Mamitha Baiju',          birthYear: 1999, gender: 'Female' },
  23: { id: 23, name: 'Shraddha Srinath',       birthYear: 1990, gender: 'Female' },
  24: { id: 24, name: 'Vijay Sethupathi',       birthYear: 1978, gender: 'Male' },
};

// ── Movie enrichment data (keyed by slug) ────────────────────────────────────
// Each entry adds director, cast, genres, and language to the existing movie
export const MOVIE_DATA = {
  'kantara': {
    directorId: 1,
    language: 'Kannada',
    runtime: '2h 24m',
    genres: ['Action', 'Thriller', 'Folklore'],
    cast: [
      { actorId: 1,  role: 'Shiva',       billing: 1 },
      { actorId: 16, role: 'Leela',        billing: 2 },
    ],
  },
  'peddi': {
    directorId: 2,
    language: 'Telugu',
    runtime: '2h 40m',
    genres: ['Sports', 'Action', 'Drama'],
    cast: [
      { actorId: 5,  role: 'Peddi',        billing: 1 },
    ],
  },
  'arjun-reddy': {
    directorId: 3,
    language: 'Telugu',
    runtime: '3h 7m',
    genres: ['Romance', 'Drama', 'Action'],
    cast: [
      { actorId: 2,  role: 'Arjun Reddy',  billing: 1 },
      { actorId: 17, role: 'Preethi Shetty', billing: 2 },
    ],
  },
  'swayam-krushi': {
    directorId: 4,
    language: 'Telugu',
    runtime: '2h 25m',
    genres: ['Drama'],
    cast: [
      { actorId: 3,  role: 'Raju',         billing: 1 },
    ],
  },
  'geetha-govindham': {
    directorId: 5,
    language: 'Telugu',
    runtime: '2h 25m',
    genres: ['Romance', 'Comedy', 'Drama'],
    cast: [
      { actorId: 2,  role: 'Govind',       billing: 1 },
      { actorId: 4,  role: 'Geetha',       billing: 2 },
    ],
  },
  'rangasthalam': {
    directorId: 6,
    language: 'Telugu',
    runtime: '2h 50m',
    genres: ['Period', 'Action', 'Political'],
    cast: [
      { actorId: 5,  role: 'Chitti Babu',       billing: 1 },
      { actorId: 6,  role: 'Rama Lakshmi',       billing: 2 },
      { actorId: 10, role: 'Phanindra Bhupathi', billing: 3 },
    ],
  },
  'hridyam': {
    directorId: 7,
    language: 'Malayalam',
    runtime: '2h 52m',
    genres: ['Coming-of-Age', 'Romance', 'Drama'],
    cast: [
      { actorId: 7,  role: 'Arun Neelakandan', billing: 1 },
      { actorId: 19, role: 'Darshana',          billing: 2 },
      { actorId: 20, role: 'Nithya',            billing: 3 },
    ],
  },
  'sita-ramam': {
    directorId: 8,
    language: 'Telugu',
    runtime: '2h 42m',
    genres: ['Romance', 'Drama', 'Period'],
    cast: [
      { actorId: 8,  role: 'Lt. Ram',              billing: 1 },
      { actorId: 9,  role: 'Sita Mahalakshmi',     billing: 2 },
    ],
  },
  'premalu': {
    directorId: 9,
    language: 'Malayalam',
    runtime: '2h 30m',
    genres: ['Romance', 'Comedy'],
    cast: [
      { actorId: 21, role: 'Sachin',       billing: 1 },
      { actorId: 22, role: 'Reenu',        billing: 2 },
    ],
  },
  'jersey': {
    directorId: 10,
    language: 'Telugu',
    runtime: '2h 42m',
    genres: ['Sports', 'Drama'],
    cast: [
      { actorId: 11, role: 'Arjun',        billing: 1 },
      { actorId: 23, role: 'Sara',          billing: 2 },
    ],
  },
  'race-gurram': {
    directorId: 11,
    language: 'Telugu',
    runtime: '2h 40m',
    genres: ['Action', 'Comedy'],
    cast: [
      { actorId: 12, role: 'Lucky',        billing: 1 },
    ],
  },
  'magadheera': {
    directorId: 12,
    language: 'Telugu',
    runtime: '2h 46m',
    genres: ['Action', 'Romance', 'Period'],
    cast: [
      { actorId: 5,  role: 'Kala Bhairava / Harsha', billing: 1 },
    ],
  },
  'fidaa': {
    directorId: 15,
    language: 'Telugu',
    runtime: '2h 20m',
    genres: ['Romance', 'Drama'],
    cast: [
      { actorId: 2,  role: 'Varun',         billing: 1 },
      { actorId: 14, role: 'Bhanumathi',     billing: 2 },
    ],
  },
  'kushi': {
    directorId: 15,
    language: 'Telugu',
    runtime: '2h 44m',
    genres: ['Romance', 'Comedy'],
    cast: [
      { actorId: 2,  role: 'Viran',         billing: 1 },
      { actorId: 6,  role: 'Aaradhya',      billing: 2 },
    ],
  },
  '96': {
    directorId: 16,
    language: 'Tamil',
    runtime: '2h 38m',
    genres: ['Romance', 'Drama'],
    cast: [
      { actorId: 24, role: 'K. Ram',        billing: 1 },
      { actorId: 15, role: 'Jaanu',         billing: 2 },
    ],
  },
  'anand': {
    directorId: 7,
    language: 'Telugu',
    runtime: '2h 15m',
    genres: ['Drama', 'Romance'],
    cast: [],
  },
  'the-paradise': {
    directorId: null,
    language: 'Indian',
    runtime: '2h 10m',
    genres: ['Drama'],
    cast: [],
  },
  'varanasi': {
    directorId: null,
    language: 'Telugu',
    runtime: '2h 18m',
    genres: ['Drama', 'Thriller'],
    cast: [],
  },
  'ye-maaya-chesave': {
    directorId: 13,
    language: 'Telugu',
    runtime: '2h 26m',
    genres: ['Romance', 'Drama'],
    cast: [
      { actorId: 11, role: 'Karthik',       billing: 1 },
      { actorId: 6,  role: 'Jessie',        billing: 2 },
    ],
  },
  'geethanjali': {
    directorId: null,
    language: 'Telugu',
    runtime: '2h 20m',
    genres: ['Romance', 'Comedy'],
    cast: [],
  },
  'janatha-garage': {
    directorId: null,
    language: 'Telugu',
    runtime: '2h 30m',
    genres: ['Action', 'Drama'],
    cast: [
      { actorId: 12, role: 'Anand',         billing: 1 },
    ],
  },
  'with-love': {
    directorId: null,
    language: 'Indian',
    runtime: '2h 15m',
    genres: ['Romance', 'Drama'],
    cast: [],
  },
  'youth': {
    directorId: null,
    language: 'Indian',
    runtime: '2h 20m',
    genres: ['Drama', 'Coming-of-Age'],
    cast: [],
  },
  'gabbarsingh': {
    directorId: 14,
    language: 'Telugu',
    runtime: '2h 40m',
    genres: ['Action', 'Comedy'],
    cast: [
      { actorId: 13, role: 'Gabbar Singh',  billing: 1 },
    ],
  },
  'couple-friendly': {
    directorId: null,
    language: 'Indian',
    runtime: '2h 15m',
    genres: ['Romance', 'Comedy'],
    cast: [],
  },
  'hi-nanna': {
    directorId: 15,
    language: 'Telugu',
    runtime: '2h 35m',
    genres: ['Drama', 'Romance'],
    cast: [
      { actorId: 11, role: 'Viraj',         billing: 1 },
      { actorId: 9,  role: 'Yashna',        billing: 2 },
    ],
  },
  '100-days-of-love': {
    directorId: null,
    language: 'Malayalam',
    runtime: '2h 15m',
    genres: ['Romance', 'Comedy'],
    cast: [
      { actorId: 8,  role: 'Balan K Nair',  billing: 1 },
    ],
  },
};

/**
 * Get enriched movie data (director, cast, genres, language) for a given slug.
 * Returns null if no data found.
 */
export function getMovieEnrichment(movieSlug) {
  const data = MOVIE_DATA[movieSlug];
  if (!data) return null;

  const director = data.directorId ? DIRECTORS[data.directorId] : null;
  const cast = (data.cast || []).map(c => ({
    ...ACTORS[c.actorId],
    role: c.role,
    billing: c.billing,
  })).filter(c => c && c.name);

  return {
    director,
    cast,
    genres: data.genres || [],
    language: data.language || 'Indian',
    runtime: data.runtime || '2h 20m',
  };
}
