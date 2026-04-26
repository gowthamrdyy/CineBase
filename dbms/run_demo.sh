#!/bin/bash
# ============================================================================
# CineBase — SQLite Demo Runner
# ============================================================================
# This script creates a SQLite database, loads the schema + sample data,
# and runs all 15 demo queries with output.
#
# Usage:
#   chmod +x run_demo.sh
#   ./run_demo.sh
#
# Requirements: SQLite3 (pre-installed on macOS)
# ============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DB_FILE="$SCRIPT_DIR/cinebase_demo.db"

# Colors for pretty output
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
BOLD='\033[1m'
NC='\033[0m' # No Color

echo ""
echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${CYAN}║           🎬 CineBase — SQL Demo for DBMS Review            ║${NC}"
echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Remove old database if it exists
if [ -f "$DB_FILE" ]; then
    rm "$DB_FILE"
    echo -e "${YELLOW}→ Removed old database${NC}"
fi

# Create database with schema
echo -e "${GREEN}→ Creating database schema (10 tables)...${NC}"
sqlite3 "$DB_FILE" < "$SCRIPT_DIR/schema.sql"

# Load sample data
echo -e "${GREEN}→ Inserting sample data...${NC}"
sqlite3 "$DB_FILE" < "$SCRIPT_DIR/sample_data.sql"

echo -e "${GREEN}→ Database created successfully at: $DB_FILE${NC}"
echo ""

# ── Helper to run a query with a heading ─────────────────────────────────────
run_query() {
    local num="$1"
    local title="$2"
    local concept="$3"
    local sql="$4"

    echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}  QUERY $num: $title${NC}"
    echo -e "${YELLOW}  Concept: $concept${NC}"
    echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${GREEN}SQL:${NC}"
    echo "$sql"
    echo ""
    echo -e "${GREEN}RESULT:${NC}"
    sqlite3 -header -column "$DB_FILE" "$sql"
    echo ""
}

# ── Run all 15 queries ──────────────────────────────────────────────────────

run_query 1 "SELECT with WHERE — Telugu movies" "Basic SELECT, WHERE filtering" \
"SELECT movie_id, title, release_year, language, cinebase_score FROM movies WHERE language = 'Telugu';"

run_query 2 "Search by Title (LIKE)" "Pattern matching with wildcards" \
"SELECT movie_id, title, release_year, cinebase_score FROM movies WHERE title LIKE '%Geetha%';"

run_query 3 "Sorting by Rating" "ORDER BY DESC" \
"SELECT title, release_year, cinebase_score FROM movies ORDER BY cinebase_score DESC, title ASC;"

run_query 4 "Movies with Directors (JOIN)" "INNER JOIN with foreign key" \
"SELECT m.title, m.release_year, m.cinebase_score, d.full_name AS director FROM movies m INNER JOIN directors d ON m.director_id = d.director_id ORDER BY m.cinebase_score DESC;"

run_query 5 "Movies with Genres (M:N JOIN)" "Many-to-Many, junction table" \
"SELECT m.title, GROUP_CONCAT(g.genre_name, ', ') AS genres FROM movies m JOIN movie_genres mg ON m.movie_id = mg.movie_id JOIN genres g ON mg.genre_id = g.genre_id GROUP BY m.movie_id ORDER BY m.title;"

run_query 6 "Average Community Rating" "AVG(), COUNT(), GROUP BY, HAVING" \
"SELECT m.title, COUNT(r.rating_id) AS total_votes, ROUND(AVG(r.score), 1) AS avg_score FROM movies m JOIN ratings r ON m.movie_id = r.movie_id GROUP BY m.movie_id HAVING COUNT(r.rating_id) >= 2 ORDER BY avg_score DESC;"

run_query 7 "Top 5 Rated Movies" "AVG, ORDER BY, LIMIT" \
"SELECT m.title, ROUND(AVG(r.score), 1) AS avg_score, COUNT(r.rating_id) AS votes FROM movies m JOIN ratings r ON m.movie_id = r.movie_id GROUP BY m.movie_id ORDER BY avg_score DESC LIMIT 5;"

run_query 8 "Movies Above Average (Subquery)" "Nested query in WHERE" \
"SELECT m.title, m.cinebase_score FROM movies m WHERE m.cinebase_score > (SELECT AVG(cinebase_score) FROM movies);"

run_query 9 "Reviews with Users & Movies" "Multi-table JOIN" \
"SELECT u.display_name AS reviewer, m.title AS movie, r.review_text, r.created_at FROM reviews r JOIN users u ON r.user_id = u.user_id JOIN movies m ON r.movie_id = m.movie_id ORDER BY r.created_at DESC;"

run_query 10 "User Watchlist" "JOIN with user-specific filter" \
"SELECT u.display_name, m.title, m.release_year, m.cinebase_score, w.added_at FROM watchlist w JOIN users u ON w.user_id = u.user_id JOIN movies m ON w.movie_id = m.movie_id WHERE u.display_name = 'Gowtham R' ORDER BY w.added_at DESC;"

run_query 11 "Cast of Rangasthalam" "M:N through junction table" \
"SELECT m.title, a.full_name AS actor, mc.role_name, mc.billing_order FROM movie_cast mc JOIN movies m ON mc.movie_id = m.movie_id JOIN actors a ON mc.actor_id = a.actor_id WHERE m.title = 'Rangasthalam' ORDER BY mc.billing_order;"

run_query 12 "Movies per Genre" "GROUP BY with COUNT" \
"SELECT g.genre_name, COUNT(mg.movie_id) AS movie_count FROM genres g JOIN movie_genres mg ON g.genre_id = mg.genre_id GROUP BY g.genre_id ORDER BY movie_count DESC;"

run_query 13 "Active Users (Correlated Subquery)" "Correlated subquery" \
"SELECT u.display_name, u.email, (SELECT COUNT(*) FROM ratings r WHERE r.user_id = u.user_id) AS movies_rated FROM users u WHERE (SELECT COUNT(*) FROM ratings r WHERE r.user_id = u.user_id) > 2;"

run_query 14 "All Movies with Review Count (LEFT JOIN)" "LEFT JOIN shows unmatched rows" \
"SELECT m.title, COUNT(rv.review_id) AS review_count FROM movies m LEFT JOIN reviews rv ON m.movie_id = rv.movie_id GROUP BY m.movie_id ORDER BY review_count DESC;"

run_query 15 "Complete Movie Report Card" "Multiple JOINs, COALESCE, aggregation" \
"SELECT m.title, m.release_year, m.language, d.full_name AS director, m.cinebase_score, COALESCE(ROUND(AVG(r.score), 1), 0) AS community_score, COALESCE(COUNT(DISTINCT r.rating_id), 0) AS total_votes, COALESCE(COUNT(DISTINCT rv.review_id), 0) AS total_reviews, COALESCE(COUNT(DISTINCT w.watchlist_id), 0) AS watchlist_adds FROM movies m LEFT JOIN directors d ON m.director_id = d.director_id LEFT JOIN ratings r ON m.movie_id = r.movie_id LEFT JOIN reviews rv ON m.movie_id = rv.movie_id LEFT JOIN watchlist w ON m.movie_id = w.movie_id GROUP BY m.movie_id ORDER BY community_score DESC;"

echo ""
echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BOLD}${CYAN}║              ✅ All 15 queries executed successfully!         ║${NC}"
echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Database file: $DB_FILE${NC}"
echo -e "${YELLOW}You can also explore interactively:${NC}"
echo -e "  ${BOLD}sqlite3 $DB_FILE${NC}"
echo ""
