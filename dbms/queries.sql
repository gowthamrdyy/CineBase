-- ============================================================================
-- CineBase — 15 Important SQL Queries for DBMS Review
-- ============================================================================
-- Each query is annotated with:
--   • What SQL concept it demonstrates
--   • What result it produces
--   • How you can explain it during viva
-- ============================================================================


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 1: SELECT with WHERE — Find all Telugu movies
-- Concept: Basic SELECT, WHERE clause, filtering
-- ═══════════════════════════════════════════════════════════════════════════
SELECT movie_id, title, release_year, language, cinebase_score
FROM movies
WHERE language = 'Telugu';

-- Explanation: "This query retrieves all movies from the movies table 
-- where the language column equals 'Telugu'. It filters rows using WHERE."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 2: Search by Title (LIKE operator)
-- Concept: Pattern matching with LIKE and wildcard %
-- ═══════════════════════════════════════════════════════════════════════════
SELECT movie_id, title, release_year, cinebase_score
FROM movies
WHERE title LIKE '%Geetha%';

-- Explanation: "The LIKE operator with % wildcards lets users search 
-- by partial title. This is how our search bar works conceptually."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 3: Sorting — Movies ordered by rating (descending)
-- Concept: ORDER BY, DESC
-- ═══════════════════════════════════════════════════════════════════════════
SELECT title, release_year, cinebase_score
FROM movies
ORDER BY cinebase_score DESC, title ASC;

-- Explanation: "ORDER BY sorts results. DESC means highest first.
-- If two movies have the same score, we sort by title A-Z (ASC)."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 4: INNER JOIN — Movies with their directors
-- Concept: JOIN, relating two tables via foreign key
-- ═══════════════════════════════════════════════════════════════════════════
SELECT m.title, m.release_year, m.cinebase_score, d.full_name AS director
FROM movies m
INNER JOIN directors d ON m.director_id = d.director_id
ORDER BY m.cinebase_score DESC;

-- Explanation: "JOIN connects two tables. Here, movies and directors 
-- are linked through director_id. INNER JOIN returns only movies 
-- that have a matching director."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 5: Multi-table JOIN — Movies with genres (M:N relationship)
-- Concept: Many-to-Many relationship, junction table, JOIN chain
-- ═══════════════════════════════════════════════════════════════════════════
SELECT m.title, GROUP_CONCAT(g.genre_name, ', ') AS genres
FROM movies m
JOIN movie_genres mg ON m.movie_id = mg.movie_id
JOIN genres g        ON mg.genre_id = g.genre_id
GROUP BY m.movie_id
ORDER BY m.title;

-- Explanation: "Movies and genres have a many-to-many relationship.
-- movie_genres is the bridge/junction table. We join through it.
-- GROUP_CONCAT combines multiple genre names into one comma-separated string."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 6: Aggregate Functions — Average community rating per movie
-- Concept: AVG(), COUNT(), GROUP BY, HAVING
-- ═══════════════════════════════════════════════════════════════════════════
SELECT m.title,
       COUNT(r.rating_id) AS total_votes,
       ROUND(AVG(r.score), 1) AS avg_community_score
FROM movies m
JOIN ratings r ON m.movie_id = r.movie_id
GROUP BY m.movie_id
HAVING COUNT(r.rating_id) >= 2
ORDER BY avg_community_score DESC;

-- Explanation: "AVG() calculates the average score. COUNT() counts how 
-- many users rated. GROUP BY groups ratings by movie. HAVING filters 
-- groups — here we only show movies with 2+ ratings."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 7: Top-Rated Movies (community score) — Limit + Aggregation
-- Concept: AVG, ORDER BY, LIMIT (top-N query)
-- ═══════════════════════════════════════════════════════════════════════════
SELECT m.title,
       ROUND(AVG(r.score), 1) AS avg_score,
       COUNT(r.rating_id) AS votes
FROM movies m
JOIN ratings r ON m.movie_id = r.movie_id
GROUP BY m.movie_id
ORDER BY avg_score DESC
LIMIT 5;

-- Explanation: "This gives us the top 5 highest-rated movies based 
-- on user ratings. LIMIT restricts the output to 5 rows."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 8: Nested Query (Subquery) — Movies rated above overall average
-- Concept: Subquery in WHERE clause
-- ═══════════════════════════════════════════════════════════════════════════
SELECT m.title, m.cinebase_score
FROM movies m
WHERE m.cinebase_score > (
    SELECT AVG(cinebase_score) FROM movies
);

-- Explanation: "The inner query (SELECT AVG...) calculates the overall 
-- average score across ALL movies. The outer query then finds only 
-- movies that scored higher than that average. This is called a subquery."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 9: Reviews joined with Users and Movies
-- Concept: Multi-table JOIN, date ordering
-- ═══════════════════════════════════════════════════════════════════════════
SELECT u.display_name AS reviewer,
       m.title AS movie,
       r.review_text,
       r.created_at
FROM reviews r
JOIN users u  ON r.user_id  = u.user_id
JOIN movies m ON r.movie_id = m.movie_id
ORDER BY r.created_at DESC;

-- Explanation: "This joins three tables — reviews, users, and movies —
-- to show who wrote what review for which movie, sorted by most recent first.
-- This is exactly what CineBase shows on the movie page."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 10: User Watchlist Query
-- Concept: JOIN, user-specific filtering
-- ═══════════════════════════════════════════════════════════════════════════
SELECT u.display_name, m.title, m.release_year, m.cinebase_score, w.added_at
FROM watchlist w
JOIN users u  ON w.user_id  = u.user_id
JOIN movies m ON w.movie_id = m.movie_id
WHERE u.display_name = 'Gowtham R'
ORDER BY w.added_at DESC;

-- Explanation: "This query gets all movies in a specific user's watchlist.
-- We join watchlist with users and movies to get human-readable data 
-- instead of just IDs."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 11: Cast list for a specific movie (M:N through junction table)
-- Concept: Many-to-Many JOIN, role details
-- ═══════════════════════════════════════════════════════════════════════════
SELECT m.title, a.full_name AS actor, mc.role_name, mc.billing_order
FROM movie_cast mc
JOIN movies m ON mc.movie_id = m.movie_id
JOIN actors a ON mc.actor_id = a.actor_id
WHERE m.title = 'Rangasthalam'
ORDER BY mc.billing_order;

-- Explanation: "This shows all actors in 'Rangasthalam' with their 
-- character names. movie_cast is the junction table that resolves 
-- the many-to-many between movies and actors."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 12: COUNT movies per genre — Which genres are most popular?
-- Concept: GROUP BY with COUNT, JOIN
-- ═══════════════════════════════════════════════════════════════════════════
SELECT g.genre_name, COUNT(mg.movie_id) AS movie_count
FROM genres g
JOIN movie_genres mg ON g.genre_id = mg.genre_id
GROUP BY g.genre_id
ORDER BY movie_count DESC;

-- Explanation: "This counts how many movies belong to each genre.
-- Romance has the most movies. This helps understand the content 
-- distribution in our database."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 13: Correlated Subquery — Users who rated more than 2 movies
-- Concept: Correlated subquery, EXISTS alternative
-- ═══════════════════════════════════════════════════════════════════════════
SELECT u.display_name, u.email,
       (SELECT COUNT(*) FROM ratings r WHERE r.user_id = u.user_id) AS movies_rated
FROM users u
WHERE (SELECT COUNT(*) FROM ratings r WHERE r.user_id = u.user_id) > 2;

-- Explanation: "This is a correlated subquery — the inner query references 
-- the outer query's u.user_id. For each user, it counts their ratings 
-- and only includes users with more than 2."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 14: LEFT JOIN — All movies, including those with no reviews
-- Concept: LEFT JOIN (shows unmatched rows too)
-- ═══════════════════════════════════════════════════════════════════════════
SELECT m.title, COUNT(rv.review_id) AS review_count
FROM movies m
LEFT JOIN reviews rv ON m.movie_id = rv.movie_id
GROUP BY m.movie_id
ORDER BY review_count DESC;

-- Explanation: "LEFT JOIN includes ALL movies, even those with zero reviews.
-- INNER JOIN would skip movies with no reviews. LEFT JOIN is important 
-- when we want to show 'no data available' instead of hiding the row."


-- ═══════════════════════════════════════════════════════════════════════════
-- QUERY 15: Complex Query — Movie report card (all concepts together)
-- Concept: Multiple JOINs, aggregations, subquery, formatting
-- ═══════════════════════════════════════════════════════════════════════════
SELECT m.title,
       m.release_year,
       m.language,
       d.full_name AS director,
       m.cinebase_score,
       COALESCE(ROUND(AVG(r.score), 1), 0) AS community_score,
       COALESCE(COUNT(DISTINCT r.rating_id), 0) AS total_votes,
       COALESCE(COUNT(DISTINCT rv.review_id), 0) AS total_reviews,
       COALESCE(COUNT(DISTINCT w.watchlist_id), 0) AS watchlist_adds
FROM movies m
LEFT JOIN directors d  ON m.director_id = d.director_id
LEFT JOIN ratings r    ON m.movie_id = r.movie_id
LEFT JOIN reviews rv   ON m.movie_id = rv.movie_id
LEFT JOIN watchlist w  ON m.movie_id = w.movie_id
GROUP BY m.movie_id
ORDER BY community_score DESC;

-- Explanation: "This is the 'report card' query — it pulls everything 
-- about each movie: director, average rating, vote count, reviews, 
-- and watchlist adds. It uses LEFT JOINs so movies with no ratings 
-- still appear. COALESCE replaces NULL with 0."
