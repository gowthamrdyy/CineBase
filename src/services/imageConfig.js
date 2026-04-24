/**
 * imageConfig.js
 * 
 * Manages which images from /IMDBB/ folder are assigned to which section.
 * 16:9 images: 21, 23, 24, 25, 26, 27, 28
 * Portrait images: all others
 * 
 * Config stored in localStorage as:
 * {
 *   hero: [{ imgNum, title, year, genre, rating, desc }],
 *   fanFavorites: [{ imgNum, title, year, rating }],
 *   topPicks: [{ imgNum, title, year, rating }],
 *   trending: [{ imgNum, title }],
 *   heroLimit: 5
 * }
 */

const CONFIG_KEY = 'cinebase-image-config';
const CHANGE_EVENT = 'cinebase-image-config-change';

export const ALL_IMAGES = Array.from({ length: 28 }, (_, i) => i + 1);

// Images identified as 16:9 (landscape 1376x768)
export const WIDESCREEN_IMAGES = [21, 23, 24, 25, 26, 27, 28];
// Portrait images
export const PORTRAIT_IMAGES = ALL_IMAGES.filter(n => !WIDESCREEN_IMAGES.includes(n));

export function getImageUrl(imgNum) {
  return `/IMDBB/${imgNum}.jpeg`;
}

const DEFAULT_CONFIG = {
  hero: [
    { imgNum: 27, title: "Kantara", year: 2022, genre: "Action, Thriller, Folklore Drama", rating: 8.2, desc: "Set in a coastal village steeped in tradition and mythology, Kantara follows a defiant young man caught in a growing conflict between villagers, forest authorities, and powerful forces seeking control over ancestral land." },
    { imgNum: 25, title: "Peddi", year: 2026, genre: "Sports Action Drama, Thriller", rating: 8.5, desc: "Set in rural Andhra Pradesh against a rugged, politically charged backdrop, Peddi follows a fierce and spirited man who rises from the heart of his village to defend its pride, identity, and survival." },
    { imgNum: 24, title: "Arjun Reddy", year: 2017, genre: "Romantic Drama, Action Drama", rating: 8.3, desc: "A brilliant yet deeply flawed young surgeon with a violent temper falls intensely in love during medical college, but when circumstances tear the relationship apart, he spirals into self-destruction through addiction, anger, and emotional collapse. " },
    { imgNum: 21, title: "Swayam Krushi", year: 1987, genre: "Drama", rating: 8, desc: "Swayam Krushi follows the inspiring journey of a humble cobbler who rises through sheer hard work, self-respect, and determination to build a dignified life. " },
    { imgNum: 23, title: "Geetha Govindham", year: 2018, genre: "Romantic Comedy, Drama", rating: 7.8, desc: "Geetha Govindam follows a sincere and well-mannered young lecturer whose life takes an unexpected turn after a misunderstanding creates tension between him and an independent, strong-willed woman." },
    { imgNum: 28, title: "Rangasthalam", year: 2018, genre: "Period Action Drama, Political Thriller", rating: 8, desc: "Set in a rural village during the 1980s, Rangasthalam follows a spirited and fearless young man whose simple life is disrupted when he becomes entangled in a struggle against a ruthless and corrupt village leader." },
    { imgNum: 26, title: "Hridyam", year: 2022, genre: "Coming-of-Age Romantic Drama", rating: 7.6, desc: "Hridayam follows the emotional journey of a young man as he navigates college life, friendship, first love, heartbreak, and the uncertainties of adulthood." }
  ],
  fanFavorites: [
    { imgNum: 13, title: "Anand", year: 2023, rating: 7.2 },
    { imgNum: 4, title: "The Paradise", year: 2023, rating: 6.5 },
    { imgNum: 8, title: "Fidaa", "year": 2023, rating: 7.1 },
    { imgNum: 9, title: "Varanasi", year: 2020, rating: 7.3 },
    { imgNum: 10, title: "Kushi", year: 2021, rating: 7.3 },
    { imgNum: 11, title: "Ye Maaya Chesave", year: 2022, rating: 8.3 },
    { imgNum: 12, title: "Geethanjali", year: 2020, rating: 8.7 },
    { imgNum: 6, title: "Janatha Garage", year: 2022, rating: 8.2 }
  ],
  topPicks: [
    { imgNum: 18, title: "With Love", year: 2019, rating: 8.5 },
    { imgNum: 3, title: "Sita Ramam", "year": 2018, rating: 8.3 },
    { imgNum: 2, title: "Premalu", "year": 2022, rating: 8.6 },
    { imgNum: 17, title: "Jersey", year: 2024, rating: 8.5 },
    { imgNum: 5, title: "Race Gurram", year: 2021, rating: 7.6 },
    { imgNum: 14, title: "Magadheera", "year": 2018, rating: 8.5 },
    { imgNum: 15, title: "Youth", year: 2019, rating: 8.4 },
    { imgNum: 16, title: "Gabbarsingh", "year": 2018, rating: 8.5 }
  ],
  trending: [
    { imgNum: 19, title: "Couple Friendly" },
    { imgNum: 22, title: "Hi Nanna" },
    { imgNum: 10, title: "Kushi" },
    { imgNum: 9, title: "Varanasi" },
    { imgNum: 8, title: "Fidaa" },
    { imgNum: 1, title: "100 Days Of Love" },
    { imgNum: 2, title: "Premalu" },
    { imgNum: 3, title: "Sita Ramam" },
    { imgNum: 20, title: "'96" }
  ],
  heroLimit: 7
};

export function loadConfig() {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_CONFIG;
}

export function saveConfig(config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function resetConfig() {
  localStorage.removeItem(CONFIG_KEY);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConfig(onChange) {
  const handler = () => onChange(loadConfig());
  window.addEventListener(CHANGE_EVENT, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(CHANGE_EVENT, handler);
    window.removeEventListener('storage', handler);
  };
}
