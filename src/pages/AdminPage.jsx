import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ALL_IMAGES,
  WIDESCREEN_IMAGES,
  PORTRAIT_IMAGES,
  getImageUrl,
  loadConfig,
  saveConfig,
  resetConfig,
} from '../services/imageConfig';
import './AdminPage.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function blankHeroEntry(imgNum) {
  return { imgNum, title: '', year: 2024, genre: 'Action', rating: 8.0, desc: '' };
}

function blankMovieEntry(imgNum) {
  return { imgNum, title: '', year: 2024, rating: 7.5 };
}

// ─── Image Picker Overlay ────────────────────────────────────────────────────

function ImagePickerOverlay({ onPick, onClose, candidates, usedNums = [] }) {
  return (
    <div className="ap-overlay" onClick={onClose}>
      <div className="ap-picker-modal" onClick={e => e.stopPropagation()}>
        <div className="ap-picker-header">
          <h3>Pick an image from IMDBB</h3>
          <button className="ap-picker-close" onClick={onClose}>✕</button>
        </div>
        <div className="ap-picker-grid">
          {candidates.map(num => {
            const isUsed = usedNums.includes(num);
            return (
              <div
                key={num}
                className={`ap-picker-thumb ${isUsed ? 'ap-picker-thumb--used' : ''}`}
                onClick={() => onPick(num)}
              >
                <img src={getImageUrl(num)} alt={`IMDBB/${num}`} />
                <div className="ap-picker-label">
                  #{num}{isUsed ? ' ✓' : ''}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Hero Entry Editor ────────────────────────────────────────────────────────

function HeroEntryEditor({ entry, onChange, onRemove, onPickImage, index }) {
  return (
    <div className="ap-hero-entry">
      <div className="ap-hero-thumb" onClick={onPickImage}>
        <img src={getImageUrl(entry.imgNum)} alt="" />
        <div className="ap-hero-thumb-badge">#{entry.imgNum} — click to change</div>
      </div>
      <div className="ap-hero-fields">
        <div className="ap-field-row">
          <label>Title</label>
          <input
            value={entry.title}
            onChange={e => onChange({ ...entry, title: e.target.value })}
            placeholder="Movie title"
          />
        </div>
        <div className="ap-field-row ap-field-row--3col">
          <div>
            <label>Year</label>
            <input
              type="number"
              value={entry.year}
              onChange={e => onChange({ ...entry, year: Number(e.target.value) })}
              placeholder="2024"
            />
          </div>
          <div>
            <label>Rating /10</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={entry.rating}
              onChange={e => onChange({ ...entry, rating: Number(e.target.value) })}
              placeholder="8.0"
            />
          </div>
          <div>
            <label>Genre</label>
            <input
              value={entry.genre}
              onChange={e => onChange({ ...entry, genre: e.target.value })}
              placeholder="Action"
            />
          </div>
        </div>
        <div className="ap-field-row">
          <label>Description</label>
          <textarea
            rows={2}
            value={entry.desc}
            onChange={e => onChange({ ...entry, desc: e.target.value })}
            placeholder="Short synopsis…"
          />
        </div>
        <button className="ap-btn ap-btn--danger" onClick={onRemove}>Remove from Hero</button>
      </div>
    </div>
  );
}

// ─── Movie Entry Editor ───────────────────────────────────────────────────────

function MovieEntryEditor({ entry, onChange, onRemove, onPickImage, section }) {
  return (
    <div className="ap-movie-entry">
      <div className="ap-movie-thumb" onClick={onPickImage}>
        <img src={getImageUrl(entry.imgNum)} alt="" />
        <div className="ap-movie-thumb-badge">#{entry.imgNum}</div>
      </div>
      <div className="ap-movie-fields">
        <input
          value={entry.title}
          onChange={e => onChange({ ...entry, title: e.target.value })}
          placeholder="Movie title"
        />
        <div className="ap-movie-row2">
          <input
            type="number"
            value={entry.year}
            onChange={e => onChange({ ...entry, year: Number(e.target.value) })}
            placeholder="Year"
          />
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={entry.rating}
            onChange={e => onChange({ ...entry, rating: Number(e.target.value) })}
            placeholder="Rating"
          />
        </div>
      </div>
      <button className="ap-movie-remove" onClick={onRemove} title="Remove">✕</button>
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────

function AdminPage() {
  const [config, setConfig] = useState(loadConfig);
  const [saved, setSaved] = useState(false);
  const [picker, setPicker] = useState(null); // { section, index }

  // Derived sets of used portrait nums
  const usedPortraitNums = [
    ...config.fanFavorites.map(e => e.imgNum),
    ...config.topPicks.map(e => e.imgNum),
    ...config.trending.map(e => e.imgNum),
  ];

  const usedWideNums = config.hero.map(e => e.imgNum);

  function handleSave() {
    saveConfig(config);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  function handleReset() {
    if (!window.confirm('Reset all assignments to default?')) return;
    resetConfig();
    setConfig(loadConfig());
  }

  // ── Hero actions ──────────────────────────────────────────────────────────

  function addHeroSlide() {
    const available = WIDESCREEN_IMAGES.find(n => !usedWideNums.includes(n));
    const imgNum = available || WIDESCREEN_IMAGES[0];
    setConfig(c => ({ ...c, hero: [...c.hero, blankHeroEntry(imgNum)] }));
  }

  function updateHeroEntry(index, entry) {
    setConfig(c => {
      const hero = [...c.hero];
      hero[index] = entry;
      return { ...c, hero };
    });
  }

  function removeHeroEntry(index) {
    setConfig(c => ({ ...c, hero: c.hero.filter((_, i) => i !== index) }));
  }

  function moveHero(index, dir) {
    setConfig(c => {
      const hero = [...c.hero];
      const target = index + dir;
      if (target < 0 || target >= hero.length) return c;
      [hero[index], hero[target]] = [hero[target], hero[index]];
      return { ...c, hero };
    });
  }

  // ── Section actions ───────────────────────────────────────────────────────

  function addMovieToSection(section) {
    const available = PORTRAIT_IMAGES.find(n => !usedPortraitNums.includes(n));
    const imgNum = available || PORTRAIT_IMAGES[0];
    setConfig(c => ({ ...c, [section]: [...c[section], blankMovieEntry(imgNum)] }));
  }

  function updateMovieEntry(section, index, entry) {
    setConfig(c => {
      const arr = [...c[section]];
      arr[index] = entry;
      return { ...c, [section]: arr };
    });
  }

  function removeMovieEntry(section, index) {
    setConfig(c => ({ ...c, [section]: c[section].filter((_, i) => i !== index) }));
  }

  // ── Picker ────────────────────────────────────────────────────────────────

  function openPicker(section, index) {
    setPicker({ section, index });
  }

  function handlePickerSelect(imgNum) {
    const { section, index } = picker;
    if (section === 'hero') {
      updateHeroEntry(index, { ...config.hero[index], imgNum });
    } else {
      updateMovieEntry(section, index, { ...config[section][index], imgNum });
    }
    setPicker(null);
  }

  const pickerCandidates = picker
    ? picker.section === 'hero'
      ? WIDESCREEN_IMAGES
      : PORTRAIT_IMAGES
    : [];

  const pickerUsed = picker
    ? picker.section === 'hero'
      ? usedWideNums
      : usedPortraitNums
    : [];

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="ap-root">
      {picker && (
        <ImagePickerOverlay
          candidates={pickerCandidates}
          usedNums={pickerUsed}
          onPick={handlePickerSelect}
          onClose={() => setPicker(null)}
        />
      )}

      {/* Header */}
      <div className="ap-topbar">
        <Link to="/" className="ap-logo">CineBase</Link>
        <h1 className="ap-title">Admin — Image Manager</h1>
        <div className="ap-topbar-actions">
          <button className="ap-btn ap-btn--ghost" onClick={handleReset}>Reset defaults</button>
          <button className="ap-btn ap-btn--primary" onClick={handleSave}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="ap-body">

        {/* ── All IMDBB images overview ── */}
        <section className="ap-card">
          <h2 className="ap-card-title">All IMDBB Images</h2>
          <p className="ap-card-sub">28 images total. <span className="ap-badge-wide">Wide (16:9)</span> go in Hero Slider. <span className="ap-badge-portrait">Portrait</span> go in carousels.</p>
          <div className="ap-all-grid">
            {ALL_IMAGES.map(num => {
              const isWide = WIDESCREEN_IMAGES.includes(num);
              const inHero = usedWideNums.includes(num);
              const inSection = usedPortraitNums.includes(num);
              return (
                <div key={num} className={`ap-all-thumb ${isWide ? 'ap-all-thumb--wide' : ''}`}>
                  <img src={getImageUrl(num)} alt={`#${num}`} />
                  <div className="ap-all-label">
                    #{num}
                    <span className={`ap-dot ${isWide ? 'ap-dot--wide' : 'ap-dot--portrait'}`}>
                      {isWide ? '16:9' : 'poster'}
                    </span>
                    {(inHero || inSection) && <span className="ap-dot ap-dot--used">assigned</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Hero Slider ── */}
        <section className="ap-card">
          <div className="ap-card-head">
            <div>
              <h2 className="ap-card-title">Hero Slider</h2>
              <p className="ap-card-sub">Only wide 16:9 images. Drag order = display order.</p>
            </div>
            <div className="ap-card-head-right">
              <label className="ap-inline-label">Show in slider:</label>
              <input
                className="ap-limit-input"
                type="number"
                min={1}
                max={config.hero.length || 7}
                value={config.heroLimit}
                onChange={e => setConfig(c => ({ ...c, heroLimit: Number(e.target.value) }))}
              />
              <span className="ap-inline-label">slides</span>
              <button className="ap-btn ap-btn--secondary" onClick={addHeroSlide}>+ Add slide</button>
            </div>
          </div>

          {config.hero.length === 0 && (
            <p className="ap-empty">No hero slides yet. Click "Add slide".</p>
          )}

          {config.hero.map((entry, i) => (
            <div key={i} className="ap-hero-row">
              <div className="ap-hero-order-btns">
                <button onClick={() => moveHero(i, -1)} disabled={i === 0}>↑</button>
                <span>{i + 1}</span>
                <button onClick={() => moveHero(i, 1)} disabled={i === config.hero.length - 1}>↓</button>
              </div>
              <HeroEntryEditor
                entry={entry}
                index={i}
                onChange={updated => updateHeroEntry(i, updated)}
                onRemove={() => removeHeroEntry(i)}
                onPickImage={() => openPicker('hero', i)}
              />
            </div>
          ))}
        </section>

        {/* ── Fan Favorites ── */}
        <SectionEditor
          title="Fan Favorites"
          sub="Portrait poster images for the 'What to watch' carousel."
          items={config.fanFavorites}
          onAdd={() => addMovieToSection('fanFavorites')}
          onUpdate={(i, e) => updateMovieEntry('fanFavorites', i, e)}
          onRemove={i => removeMovieEntry('fanFavorites', i)}
          onPickImage={i => openPicker('fanFavorites', i)}
        />

        {/* ── Top Picks ── */}
        <SectionEditor
          title="Top Picks"
          sub="Portrait poster images for the 'Top picks' carousel."
          items={config.topPicks}
          onAdd={() => addMovieToSection('topPicks')}
          onUpdate={(i, e) => updateMovieEntry('topPicks', i, e)}
          onRemove={i => removeMovieEntry('topPicks', i)}
          onPickImage={i => openPicker('topPicks', i)}
        />

        {/* ── Trending ── */}
        <SectionEditor
          title="Trending / Most Popular"
          sub="Portrait poster images for the 'Most popular movies' carousel."
          items={config.trending}
          onAdd={() => addMovieToSection('trending')}
          onUpdate={(i, e) => updateMovieEntry('trending', i, e)}
          onRemove={i => removeMovieEntry('trending', i)}
          onPickImage={i => openPicker('trending', i)}
          isTrending
        />

        <div className="ap-save-row">
          <button className="ap-btn ap-btn--primary ap-btn--lg" onClick={handleSave}>
            {saved ? '✓ Saved!' : 'Save All Changes'}
          </button>
          <Link to="/" className="ap-btn ap-btn--ghost ap-btn--lg">← Back to Site</Link>
        </div>
      </div>
    </div>
  );
}

// ─── Section Editor ───────────────────────────────────────────────────────────

function SectionEditor({ title, sub, items, onAdd, onUpdate, onRemove, onPickImage, isTrending }) {
  return (
    <section className="ap-card">
      <div className="ap-card-head">
        <div>
          <h2 className="ap-card-title">{title}</h2>
          <p className="ap-card-sub">{sub}</p>
        </div>
        <button className="ap-btn ap-btn--secondary" onClick={onAdd}>+ Add movie</button>
      </div>

      {items.length === 0 && <p className="ap-empty">No movies yet.</p>}

      <div className="ap-movies-grid">
        {items.map((entry, i) => (
          <MovieEntryEditor
            key={i}
            entry={entry}
            section={title}
            onChange={updated => onUpdate(i, updated)}
            onRemove={() => onRemove(i)}
            onPickImage={() => onPickImage(i)}
          />
        ))}
      </div>
    </section>
  );
}

export default AdminPage;
