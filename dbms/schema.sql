-- ============================================================================
-- CineBase — Relational Database Schema (3NF Normalized)
-- DBMS Mini-Project: Movie Database System
-- ============================================================================
-- This schema maps to the Firebase-backed CineBase web application.
-- It demonstrates relational modeling, normalization, and SQL concepts.
-- ============================================================================

-- ────────────────────────────────────────────────────────────────────────────
-- TABLE 1: users
-- Stores registered user profiles (maps to Firebase "users" collection)
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE users (
    user_id       INTEGER      PRIMARY KEY AUTOINCREMENT,
    uid           VARCHAR(128) NOT NULL UNIQUE,         -- Firebase UID
    email         VARCHAR(255) NOT NULL UNIQUE,
    display_name  VARCHAR(100) NOT NULL,
    photo_url     TEXT         DEFAULT '',
    is_admin      BOOLEAN      DEFAULT 0,
    created_at    DATETIME     DEFAULT CURRENT_TIMESTAMP,
    last_login_at DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- ────────────────────────────────────────────────────────────────────────────
-- TABLE 2: genres
-- Master list of genres — separated from movies for normalization (2NF)
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE genres (
    genre_id   INTEGER      PRIMARY KEY AUTOINCREMENT,
    genre_name VARCHAR(50)  NOT NULL UNIQUE
);

-- ────────────────────────────────────────────────────────────────────────────
-- TABLE 3: directors
-- Each director is a separate entity to avoid repeating data (3NF)
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE directors (
    director_id  INTEGER      PRIMARY KEY AUTOINCREMENT,
    full_name    VARCHAR(100) NOT NULL,
    birth_year   INTEGER,
    nationality  VARCHAR(50)  DEFAULT 'Indian'
);

-- ────────────────────────────────────────────────────────────────────────────
-- TABLE 4: actors
-- Stores actor/cast information
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE actors (
    actor_id    INTEGER      PRIMARY KEY AUTOINCREMENT,
    full_name   VARCHAR(100) NOT NULL,
    birth_year  INTEGER,
    gender      VARCHAR(10)  CHECK (gender IN ('Male', 'Female', 'Other')),
    nationality VARCHAR(50)  DEFAULT 'Indian'
);

-- ────────────────────────────────────────────────────────────────────────────
-- TABLE 5: movies
-- Core movie table (maps to image-config entries + movieCatalog.js)
-- director_id is a FK — each movie has one primary director
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE movies (
    movie_id       INTEGER      PRIMARY KEY AUTOINCREMENT,
    title          VARCHAR(200) NOT NULL,
    release_year   INTEGER      NOT NULL CHECK (release_year >= 1900),
    runtime        VARCHAR(20)  DEFAULT '2h 20m',
    language       VARCHAR(50)  DEFAULT 'Telugu',
    description    TEXT,
    poster_url     TEXT,
    cinebase_score DECIMAL(3,1) DEFAULT 0.0 CHECK (cinebase_score BETWEEN 0.0 AND 10.0),
    director_id    INTEGER,
    created_at     DATETIME     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (director_id) REFERENCES directors(director_id)
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- ────────────────────────────────────────────────────────────────────────────
-- TABLE 6: movie_genres  (Junction / Bridge table — M:N relationship)
-- A movie can belong to many genres; a genre can have many movies
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE movie_genres (
    movie_id  INTEGER NOT NULL,
    genre_id  INTEGER NOT NULL,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ────────────────────────────────────────────────────────────────────────────
-- TABLE 7: movie_cast  (Junction / Bridge table — M:N relationship)
-- A movie can have many actors; an actor can appear in many movies
-- role_name stores the character played
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE movie_cast (
    movie_id  INTEGER      NOT NULL,
    actor_id  INTEGER      NOT NULL,
    role_name VARCHAR(100) DEFAULT 'Lead',
    billing_order INTEGER  DEFAULT 1,
    PRIMARY KEY (movie_id, actor_id),
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (actor_id) REFERENCES actors(actor_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ────────────────────────────────────────────────────────────────────────────
-- TABLE 8: ratings  (maps to Firebase "movieRatings" collection)
-- Each row = one user's rating for one movie
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE ratings (
    rating_id  INTEGER  PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER  NOT NULL,
    movie_id   INTEGER  NOT NULL,
    score      INTEGER  NOT NULL CHECK (score BETWEEN 1 AND 10),
    rated_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, movie_id),   -- one rating per user per movie
    FOREIGN KEY (user_id)  REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ────────────────────────────────────────────────────────────────────────────
-- TABLE 9: reviews  (maps to Firebase "movieRatings/{movieId}/reviews")
-- Each row = one user's text review for one movie
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE reviews (
    review_id   INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER NOT NULL,
    movie_id    INTEGER NOT NULL,
    review_text TEXT    NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)  REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ────────────────────────────────────────────────────────────────────────────
-- TABLE 10: watchlist  (user's saved movies — maps to planned feature)
-- ────────────────────────────────────────────────────────────────────────────
CREATE TABLE watchlist (
    watchlist_id INTEGER  PRIMARY KEY AUTOINCREMENT,
    user_id      INTEGER  NOT NULL,
    movie_id     INTEGER  NOT NULL,
    added_at     DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, movie_id),   -- a user can't add the same movie twice
    FOREIGN KEY (user_id)  REFERENCES users(user_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
        ON DELETE CASCADE ON UPDATE CASCADE
);
