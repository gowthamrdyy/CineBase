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
    { imgNum: 21, title: 'Baahubali 2: The Conclusion', year: 2017, genre: 'Action, Drama', rating: 8.2, desc: 'Amarendra Baahubali, the heir apparent to the throne of Mahishmati, finds his life and relationships endangered.' },
    { imgNum: 23, title: 'RRR', year: 2022, genre: 'Action, Drama', rating: 7.8, desc: 'A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country.' },
    { imgNum: 24, title: 'Vikram', year: 2022, genre: 'Action, Thriller', rating: 8.3, desc: 'A special investigator discovers a case of serial killings is not what it seems to be.' },
    { imgNum: 25, title: 'Kalki 2898 AD', year: 2024, genre: 'Sci-Fi, Action', rating: 8.5, desc: 'A modern-day avatar descends to earth to protect the world from evil forces in a futuristic dystopia.' },
    { imgNum: 26, title: 'Pushpa: The Rise', year: 2021, genre: 'Action, Crime', rating: 7.6, desc: 'A labourer rises through the ranks of a red sandalwood smuggling syndicate, making powerful enemies.' },
  ],
  fanFavorites: [
    { imgNum: 6, title: 'Leo', year: 2023, rating: 7.2 },
    { imgNum: 7, title: 'Salaar: Ceasefire', year: 2023, rating: 6.5 },
    { imgNum: 8, title: 'Jailer', year: 2023, rating: 7.1 },
    { imgNum: 9, title: 'Ala Vaikunthapurramuloo', year: 2020, rating: 7.3 },
    { imgNum: 10, title: 'Master', year: 2021, rating: 7.3 },
    { imgNum: 11, title: 'K.G.F: Chapter 2', year: 2022, rating: 8.3 },
    { imgNum: 12, title: 'Soorarai Pottru', year: 2020, rating: 8.7 },
    { imgNum: 13, title: 'Kantara', year: 2022, rating: 8.2 },
  ],
  topPicks: [
    { imgNum: 1, title: 'Jersey', year: 2019, rating: 8.5 },
    { imgNum: 3, title: 'Ratsasan', year: 2018, rating: 8.3 },
    { imgNum: 2, title: 'Sita Ramam', year: 2022, rating: 8.6 },
    { imgNum: 4, title: 'Kalki 2898 AD', year: 2024, rating: 8.5 },
    { imgNum: 5, title: 'Pushpa: The Rise', year: 2021, rating: 7.6 },
    { imgNum: 14, title: 'Mahanati', year: 2018, rating: 8.5 },
    { imgNum: 15, title: 'Asuran', year: 2019, rating: 8.4 },
    { imgNum: 16, title: '96', year: 2018, rating: 8.5 },
  ],
  trending: [
    { imgNum: 4, title: 'Kalki 2898 AD' },
    { imgNum: 7, title: 'Devara: Part 1' },
    { imgNum: 10, title: 'Captain Miller' },
    { imgNum: 9, title: 'Guntur Kaaram' },
    { imgNum: 8, title: 'Indian 2' },
    { imgNum: 1, title: 'Baahubali 2' },
    { imgNum: 2, title: 'RRR' },
    { imgNum: 3, title: 'Vikram' },
    { imgNum: 6, title: 'Leo' },
  ],
  heroLimit: 5,
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
