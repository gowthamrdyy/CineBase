import React from 'react';
import '../styles/BoxOffice.css';

function BoxOffice({ boxOfficeData }) {
  return (
    <>
      <div className="section-header">
        <h2>Top box office (India)</h2>
        <a className="section-link" href="#/">
          See more
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </a>
      </div>
      <p className="section-subtitle">Weekend of April 18–20</p>
      <div className="box-office-table">
        {boxOfficeData.map((movie, idx) => (
          <div key={idx} className="box-office-row">
            <div className="box-office-rank">{movie.rank}</div>
            <div className="box-office-title-group">
              <div className="box-office-title">{movie.title}</div>
              <div className="box-office-weekend">{movie.weekend} weekend</div>
            </div>
            <div className="box-office-gross">{movie.total}</div>
            <div className="box-office-weeks">{movie.weeks}w</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BoxOffice;
