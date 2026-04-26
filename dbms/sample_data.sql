-- ============================================================================
-- CineBase — Sample INSERT Statements with Realistic Data
-- ============================================================================
-- This data mirrors the actual CineBase website's movie catalog.
-- All movie titles, years, and descriptions match the live Firebase data.
-- ============================================================================

-- ── GENRES ──────────────────────────────────────────────────────────────────
INSERT INTO genres (genre_name) VALUES ('Action');           -- 1
INSERT INTO genres (genre_name) VALUES ('Drama');            -- 2
INSERT INTO genres (genre_name) VALUES ('Thriller');         -- 3
INSERT INTO genres (genre_name) VALUES ('Romance');          -- 4
INSERT INTO genres (genre_name) VALUES ('Comedy');           -- 5
INSERT INTO genres (genre_name) VALUES ('Sports');           -- 6
INSERT INTO genres (genre_name) VALUES ('Folklore');         -- 7
INSERT INTO genres (genre_name) VALUES ('Political');        -- 8
INSERT INTO genres (genre_name) VALUES ('Coming-of-Age');    -- 9
INSERT INTO genres (genre_name) VALUES ('Period');           -- 10

-- ── DIRECTORS ──────────────────────────────────────────────────────────────
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Rishab Shetty',    1983, 'Indian');  -- 1
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('A. Harsha',        1985, 'Indian');  -- 2
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Sandeep Reddy Vanga', 1987, 'Indian'); -- 3
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('K. Viswanath',     1930, 'Indian');  -- 4
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Parasuram',        1983, 'Indian');  -- 5
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Sukumar',          1970, 'Indian');  -- 6
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Vineeth Sreenivasan', 1985, 'Indian'); -- 7
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Hanu Raghavapudi', 1984, 'Indian');  -- 8
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Girish A.D.',      1988, 'Indian');  -- 9
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Gowtam Tinnanuri', 1987, 'Indian');  -- 10
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Surender Reddy',   1971, 'Indian');  -- 11
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('S.S. Rajamouli',   1973, 'Indian');  -- 12
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Gautham Vasudev Menon', 1972, 'Indian'); -- 13
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Harish Shankar',   1979, 'Indian');  -- 14
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('Shouryuv',         1990, 'Indian');  -- 15
INSERT INTO directors (full_name, birth_year, nationality) VALUES ('C. Prem Kumar',    1978, 'Indian');  -- 16

-- ── ACTORS ─────────────────────────────────────────────────────────────────
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Rishab Shetty',   1983, 'Male',   'Indian'); -- 1
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Vijay Deverakonda', 1989, 'Male', 'Indian'); -- 2
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Chiranjeevi',     1955, 'Male',   'Indian'); -- 3
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Rashmika Mandanna', 1996, 'Female', 'Indian'); -- 4
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Ram Charan',      1985, 'Male',   'Indian'); -- 5
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Samantha Ruth Prabhu', 1987, 'Female', 'Indian'); -- 6
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Pranav Mohanlal', 1990, 'Male',   'Indian'); -- 7
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Dulquer Salmaan', 1986, 'Male',   'Indian'); -- 8
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Mrunal Thakur',   1992, 'Female', 'Indian'); -- 9
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Nassar',          1958, 'Male',   'Indian'); -- 10
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Nani',            1984, 'Male',   'Indian'); -- 11
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Allu Arjun',      1983, 'Male',   'Indian'); -- 12
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Pawan Kalyan',    1971, 'Male',   'Indian'); -- 13
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Sai Pallavi',     1992, 'Female', 'Indian'); -- 14
INSERT INTO actors (full_name, birth_year, gender, nationality) VALUES ('Trisha',          1983, 'Female', 'Indian'); -- 15

-- ── MOVIES ─────────────────────────────────────────────────────────────────
-- (Matches actual CineBase catalog titles)
INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Kantara', 2022, '2h 24m', 'Kannada',
 'Set in a coastal village steeped in tradition and mythology, Kantara follows a defiant young man caught in a growing conflict between villagers, forest authorities, and powerful forces seeking control over ancestral land.',
 '/IMDBB/27.jpeg', 8.2, 1);   -- movie_id = 1

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Peddi', 2026, '2h 40m', 'Telugu',
 'Set in rural Andhra Pradesh against a rugged, politically charged backdrop, Peddi follows a fierce and spirited man who rises from the heart of his village to defend its pride, identity, and survival.',
 '/IMDBB/25.jpeg', 8.5, 2);   -- movie_id = 2

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Arjun Reddy', 2017, '3h 7m', 'Telugu',
 'A brilliant yet deeply flawed young surgeon with a violent temper falls intensely in love during medical college, but when circumstances tear the relationship apart, he spirals into self-destruction through addiction, anger, and emotional collapse.',
 '/IMDBB/24.jpeg', 8.3, 3);   -- movie_id = 3

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Swayam Krushi', 1987, '2h 25m', 'Telugu',
 'Swayam Krushi follows the inspiring journey of a humble cobbler who rises through sheer hard work, self-respect, and determination to build a dignified life.',
 '/IMDBB/21.jpeg', 8.0, 4);   -- movie_id = 4

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Geetha Govindham', 2018, '2h 25m', 'Telugu',
 'Geetha Govindam follows a sincere and well-mannered young lecturer whose life takes an unexpected turn after a misunderstanding creates tension between him and an independent, strong-willed woman.',
 '/IMDBB/23.jpeg', 7.8, 5);   -- movie_id = 5

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Rangasthalam', 2018, '2h 50m', 'Telugu',
 'Set in a rural village during the 1980s, Rangasthalam follows a spirited and fearless young man whose simple life is disrupted when he becomes entangled in a struggle against a ruthless and corrupt village leader.',
 '/IMDBB/28.jpeg', 8.0, 6);   -- movie_id = 6

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Hridayam', 2022, '2h 52m', 'Malayalam',
 'Hridayam follows the emotional journey of a young man as he navigates college life, friendship, first love, heartbreak, and the uncertainties of adulthood.',
 '/IMDBB/26.jpeg', 7.6, 7);   -- movie_id = 7

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Sita Ramam', 2022, '2h 42m', 'Telugu',
 'A soldier stationed at the border receives a letter from a mysterious woman, triggering an emotional journey of love and discovery.',
 '/IMDBB/3.jpeg', 8.3, 8);    -- movie_id = 8

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Premalu', 2024, '2h 30m', 'Malayalam',
 'A light-hearted romantic comedy about a young man navigating the ups and downs of modern love and relationships.',
 '/IMDBB/2.jpeg', 8.6, 9);    -- movie_id = 9

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Jersey', 2019, '2h 42m', 'Telugu',
 'A talented but failed cricketer decides to return to cricket in his late 30s, driven by the desire to represent the Indian cricket team and fulfill his son''s wish.',
 '/IMDBB/17.jpeg', 8.5, 10);   -- movie_id = 10

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Race Gurram', 2014, '2h 40m', 'Telugu',
 'A light-hearted action entertainer about a carefree young man who gets caught up in political conspiracies and family drama.',
 '/IMDBB/5.jpeg', 7.6, 11);    -- movie_id = 11

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Magadheera', 2009, '2h 46m', 'Telugu',
 'An epic reincarnation saga spanning centuries, connecting a warrior''s love from a royal past to modern-day destiny.',
 '/IMDBB/14.jpeg', 8.5, 12);   -- movie_id = 12

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Fidaa', 2017, '2h 20m', 'Telugu',
 'A charming village girl and an NRI doctor find love when he visits his hometown, bridging two very different worlds.',
 '/IMDBB/8.jpeg', 7.1, 15);    -- movie_id = 13

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('Kushi', 2023, '2h 44m', 'Telugu',
 'A romantic comedy about a couple with contrasting personalities who find themselves in an arranged marriage.',
 '/IMDBB/10.jpeg', 7.3, 15);   -- movie_id = 14

INSERT INTO movies (title, release_year, runtime, language, description, poster_url, cinebase_score, director_id) VALUES
('96', 2018, '2h 38m', 'Tamil',
 'Two school sweethearts meet after 22 years at a reunion, rekindling memories and emotions of their unforgettable first love.',
 '/IMDBB/20.jpeg', 8.4, 16);   -- movie_id = 15

-- ── USERS ──────────────────────────────────────────────────────────────────
INSERT INTO users (uid, email, display_name, photo_url, is_admin) VALUES
('uid-001', 'gowtham@gmail.com',    'Gowtham R',     '', 1);
INSERT INTO users (uid, email, display_name, photo_url, is_admin) VALUES
('uid-002', 'priya.k@gmail.com',    'Priya K',       '', 0);
INSERT INTO users (uid, email, display_name, photo_url, is_admin) VALUES
('uid-003', 'rahul.s@gmail.com',    'Rahul S',       '', 0);
INSERT INTO users (uid, email, display_name, photo_url, is_admin) VALUES
('uid-004', 'sneha.m@gmail.com',    'Sneha M',       '', 0);
INSERT INTO users (uid, email, display_name, photo_url, is_admin) VALUES
('uid-005', 'arjun.v@gmail.com',    'Arjun V',       '', 0);
INSERT INTO users (uid, email, display_name, photo_url, is_admin) VALUES
('uid-006', 'deepika.r@gmail.com',  'Deepika R',     '', 0);
INSERT INTO users (uid, email, display_name, photo_url, is_admin) VALUES
('uid-007', 'karthik.n@gmail.com',  'Karthik N',     '', 0);
INSERT INTO users (uid, email, display_name, photo_url, is_admin) VALUES
('uid-008', 'ananya.p@gmail.com',   'Ananya P',      '', 0);

-- ── MOVIE-GENRE MAPPINGS ───────────────────────────────────────────────────
-- Kantara (1): Action, Thriller, Folklore
INSERT INTO movie_genres VALUES (1, 1); INSERT INTO movie_genres VALUES (1, 3); INSERT INTO movie_genres VALUES (1, 7);
-- Peddi (2): Sports, Action, Drama
INSERT INTO movie_genres VALUES (2, 6); INSERT INTO movie_genres VALUES (2, 1); INSERT INTO movie_genres VALUES (2, 2);
-- Arjun Reddy (3): Romance, Drama, Action
INSERT INTO movie_genres VALUES (3, 4); INSERT INTO movie_genres VALUES (3, 2); INSERT INTO movie_genres VALUES (3, 1);
-- Swayam Krushi (4): Drama
INSERT INTO movie_genres VALUES (4, 2);
-- Geetha Govindham (5): Romance, Comedy, Drama
INSERT INTO movie_genres VALUES (5, 4); INSERT INTO movie_genres VALUES (5, 5); INSERT INTO movie_genres VALUES (5, 2);
-- Rangasthalam (6): Period, Action, Political
INSERT INTO movie_genres VALUES (6, 10); INSERT INTO movie_genres VALUES (6, 1); INSERT INTO movie_genres VALUES (6, 8);
-- Hridayam (7): Coming-of-Age, Romance, Drama
INSERT INTO movie_genres VALUES (7, 9); INSERT INTO movie_genres VALUES (7, 4); INSERT INTO movie_genres VALUES (7, 2);
-- Sita Ramam (8): Romance, Drama
INSERT INTO movie_genres VALUES (8, 4); INSERT INTO movie_genres VALUES (8, 2);
-- Premalu (9): Romance, Comedy
INSERT INTO movie_genres VALUES (9, 4); INSERT INTO movie_genres VALUES (9, 5);
-- Jersey (10): Sports, Drama
INSERT INTO movie_genres VALUES (10, 6); INSERT INTO movie_genres VALUES (10, 2);
-- Race Gurram (11): Action, Comedy
INSERT INTO movie_genres VALUES (11, 1); INSERT INTO movie_genres VALUES (11, 5);
-- Magadheera (12): Action, Romance, Period
INSERT INTO movie_genres VALUES (12, 1); INSERT INTO movie_genres VALUES (12, 4); INSERT INTO movie_genres VALUES (12, 10);
-- Fidaa (13): Romance, Drama
INSERT INTO movie_genres VALUES (13, 4); INSERT INTO movie_genres VALUES (13, 2);
-- Kushi (14): Romance, Comedy
INSERT INTO movie_genres VALUES (14, 4); INSERT INTO movie_genres VALUES (14, 5);
-- 96 (15): Romance, Drama
INSERT INTO movie_genres VALUES (15, 4); INSERT INTO movie_genres VALUES (15, 2);

-- ── MOVIE-CAST MAPPINGS ────────────────────────────────────────────────────
-- Kantara → Rishab Shetty
INSERT INTO movie_cast VALUES (1, 1, 'Shiva', 1);
-- Arjun Reddy → Vijay Deverakonda
INSERT INTO movie_cast VALUES (3, 2, 'Arjun Reddy', 1);
-- Swayam Krushi → Chiranjeevi
INSERT INTO movie_cast VALUES (4, 3, 'Raju', 1);
-- Geetha Govindham → Vijay Deverakonda, Rashmika Mandanna
INSERT INTO movie_cast VALUES (5, 2, 'Govind', 1);
INSERT INTO movie_cast VALUES (5, 4, 'Geetha', 2);
-- Rangasthalam → Ram Charan, Samantha
INSERT INTO movie_cast VALUES (6, 5, 'Chitti Babu', 1);
INSERT INTO movie_cast VALUES (6, 6, 'Rama Lakshmi', 2);
-- Hridayam → Pranav Mohanlal
INSERT INTO movie_cast VALUES (7, 7, 'Arun Neelakandan', 1);
-- Sita Ramam → Dulquer Salmaan, Mrunal Thakur
INSERT INTO movie_cast VALUES (8, 8, 'Lieutenant Ram', 1);
INSERT INTO movie_cast VALUES (8, 9, 'Sita Mahalakshmi', 2);
-- Magadheera → Ram Charan
INSERT INTO movie_cast VALUES (12, 5, 'Kala Bhairava / Harsha', 1);
-- Jersey → Nani
INSERT INTO movie_cast VALUES (10, 11, 'Arjun', 1);
-- Race Gurram → Allu Arjun
INSERT INTO movie_cast VALUES (11, 12, 'Lucky', 1);
-- Fidaa → Sai Pallavi
INSERT INTO movie_cast VALUES (13, 14, 'Bhanumathi', 1);
-- Kushi → Vijay Deverakonda, Samantha
INSERT INTO movie_cast VALUES (14, 2, 'Viran', 1);
INSERT INTO movie_cast VALUES (14, 6, 'Aaradhya', 2);
-- 96 → Trisha
INSERT INTO movie_cast VALUES (15, 15, 'Jaanu', 2);

-- ── RATINGS ────────────────────────────────────────────────────────────────
-- Multiple users rating different movies (score: 1 to 10)
INSERT INTO ratings (user_id, movie_id, score) VALUES (1, 1, 9);   -- Gowtham rates Kantara
INSERT INTO ratings (user_id, movie_id, score) VALUES (1, 3, 8);   -- Gowtham rates Arjun Reddy
INSERT INTO ratings (user_id, movie_id, score) VALUES (1, 6, 9);   -- Gowtham rates Rangasthalam
INSERT INTO ratings (user_id, movie_id, score) VALUES (2, 1, 8);   -- Priya rates Kantara
INSERT INTO ratings (user_id, movie_id, score) VALUES (2, 5, 9);   -- Priya rates Geetha Govindham
INSERT INTO ratings (user_id, movie_id, score) VALUES (2, 8, 10);  -- Priya rates Sita Ramam
INSERT INTO ratings (user_id, movie_id, score) VALUES (3, 3, 7);   -- Rahul rates Arjun Reddy
INSERT INTO ratings (user_id, movie_id, score) VALUES (3, 6, 8);   -- Rahul rates Rangasthalam
INSERT INTO ratings (user_id, movie_id, score) VALUES (3, 12, 9);  -- Rahul rates Magadheera
INSERT INTO ratings (user_id, movie_id, score) VALUES (4, 8, 9);   -- Sneha rates Sita Ramam
INSERT INTO ratings (user_id, movie_id, score) VALUES (4, 7, 8);   -- Sneha rates Hridayam
INSERT INTO ratings (user_id, movie_id, score) VALUES (4, 9, 10);  -- Sneha rates Premalu
INSERT INTO ratings (user_id, movie_id, score) VALUES (5, 1, 10);  -- Arjun rates Kantara
INSERT INTO ratings (user_id, movie_id, score) VALUES (5, 12, 9);  -- Arjun rates Magadheera
INSERT INTO ratings (user_id, movie_id, score) VALUES (5, 10, 8);  -- Arjun rates Jersey
INSERT INTO ratings (user_id, movie_id, score) VALUES (6, 5, 8);   -- Deepika rates Geetha Govindham
INSERT INTO ratings (user_id, movie_id, score) VALUES (6, 9, 9);   -- Deepika rates Premalu
INSERT INTO ratings (user_id, movie_id, score) VALUES (6, 15, 10); -- Deepika rates 96
INSERT INTO ratings (user_id, movie_id, score) VALUES (7, 3, 9);   -- Karthik rates Arjun Reddy
INSERT INTO ratings (user_id, movie_id, score) VALUES (7, 6, 10);  -- Karthik rates Rangasthalam
INSERT INTO ratings (user_id, movie_id, score) VALUES (7, 11, 7);  -- Karthik rates Race Gurram
INSERT INTO ratings (user_id, movie_id, score) VALUES (8, 7, 9);   -- Ananya rates Hridayam
INSERT INTO ratings (user_id, movie_id, score) VALUES (8, 13, 8);  -- Ananya rates Fidaa
INSERT INTO ratings (user_id, movie_id, score) VALUES (8, 14, 7);  -- Ananya rates Kushi

-- ── REVIEWS ────────────────────────────────────────────────────────────────
INSERT INTO reviews (user_id, movie_id, review_text) VALUES
(1, 1, 'Kantara is a masterpiece! The way it blends folklore with modern storytelling is incredible. Rishab Shetty delivers a career-best performance.');

INSERT INTO reviews (user_id, movie_id, review_text) VALUES
(2, 8, 'Sita Ramam is the most beautiful love story I have seen in recent years. Dulquer Salmaan and Mrunal Thakur have amazing chemistry.');

INSERT INTO reviews (user_id, movie_id, review_text) VALUES
(3, 6, 'Rangasthalam is a visual treat. Ram Charan''s portrayal of a hearing-impaired village man is so convincing. Sukumar''s direction is top-notch.');

INSERT INTO reviews (user_id, movie_id, review_text) VALUES
(4, 9, 'Premalu had me laughing from start to finish. Such a refreshing take on modern romance. The dialogue writing is natural and witty.');

INSERT INTO reviews (user_id, movie_id, review_text) VALUES
(5, 12, 'Magadheera is the movie that defined Indian fantasy cinema. The chariot race sequence is still unmatched even after 15+ years!');

INSERT INTO reviews (user_id, movie_id, review_text) VALUES
(6, 15, '96 is pure nostalgia. Every school-love couple will relate to Jaanu and Ram''s story. The climax left me in tears.');

INSERT INTO reviews (user_id, movie_id, review_text) VALUES
(7, 3, 'Arjun Reddy is raw and intense. You may not agree with the character, but you cannot deny the performance. Vijay Deverakonda was born for this role.');

INSERT INTO reviews (user_id, movie_id, review_text) VALUES
(8, 7, 'Hridayam captured college life perfectly. The music, the friendships, the heartbreaks — it felt like watching my own life on screen.');

INSERT INTO reviews (user_id, movie_id, review_text) VALUES
(1, 5, 'Geetha Govindham is a feel-good movie. Perfect for a weekend watch. VD and Rashmika make such a cute pair on screen!');

INSERT INTO reviews (user_id, movie_id, review_text) VALUES
(2, 10, 'Jersey made me cry. Nani deserved all the awards for this performance. A sports drama that is actually about fatherhood and second chances.');

-- ── WATCHLIST ───────────────────────────────────────────────────────────────
INSERT INTO watchlist (user_id, movie_id) VALUES (1, 2);   -- Gowtham → Peddi
INSERT INTO watchlist (user_id, movie_id) VALUES (1, 9);   -- Gowtham → Premalu
INSERT INTO watchlist (user_id, movie_id) VALUES (1, 15);  -- Gowtham → 96
INSERT INTO watchlist (user_id, movie_id) VALUES (2, 1);   -- Priya → Kantara
INSERT INTO watchlist (user_id, movie_id) VALUES (2, 7);   -- Priya → Hridayam
INSERT INTO watchlist (user_id, movie_id) VALUES (3, 2);   -- Rahul → Peddi
INSERT INTO watchlist (user_id, movie_id) VALUES (3, 8);   -- Rahul → Sita Ramam
INSERT INTO watchlist (user_id, movie_id) VALUES (4, 3);   -- Sneha → Arjun Reddy
INSERT INTO watchlist (user_id, movie_id) VALUES (5, 9);   -- Arjun → Premalu
INSERT INTO watchlist (user_id, movie_id) VALUES (6, 12);  -- Deepika → Magadheera
INSERT INTO watchlist (user_id, movie_id) VALUES (7, 10);  -- Karthik → Jersey
INSERT INTO watchlist (user_id, movie_id) VALUES (8, 5);   -- Ananya → Geetha Govindham
