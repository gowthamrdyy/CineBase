import React from 'react';
import '../styles/EditorialGrid.css';

function EditorialGrid({ editorials, onCardClick }) {
  return (
    <>
      <div className="section-header">
        <h2>Featured today</h2>
        <a className="section-link" href="#/">
          See more
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </a>
      </div>
      <div className="editorial-grid">
        {editorials.map((item, idx) => (
          <div key={idx} className="editorial-card" onClick={() => onCardClick(item)}>
            <img src={item.img} alt={item.title} loading="lazy" />
            <div className="editorial-card-overlay">
              <div className="editorial-card-title">{item.title}</div>
              <div className="editorial-card-desc">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EditorialGrid;
