import React from 'react';
import '../styles/NewsGrid.css';

function NewsGrid({ news, onCardClick }) {
  return (
    <>
      <div className="section-header">
        <h2>Top news</h2>
        <a className="section-link" href="#/">
          See more
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </a>
      </div>
      <div className="news-grid">
        {news.map((article, idx) => (
          <div key={idx} className="news-card" onClick={() => onCardClick(article)}>
            <div className="news-card-img">
              <img src={article.img} alt={article.title} loading="lazy" />
            </div>
            <div className="news-card-info">
              <div className="news-card-title">{article.title}</div>
              <div className="news-card-desc">{article.desc}</div>
              <div className="news-card-meta">
                {article.time} · {article.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default NewsGrid;
