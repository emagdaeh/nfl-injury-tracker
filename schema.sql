DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS favoritePlayer;

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  position VARCHAR(2),
  player VARCHAR(75),
  team VARCHAR(20),
  gamesPlayed INTEGER,
  gamesMissed INTEGER,
  photo VARCHAR(200)
);

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  city VARCHAR (20),
  name VARCHAR (20),
  logo VARCHAR (200),
  questionablePerSeason INTEGER,
  doubtfulPerSeason INTEGER,
  outPerSeason INTEGER
);

CREATE TABLE favoritePlayers (
  id SERIAL PRIMARY KEY,
  position VARCHAR(2),
  player VARCHAR(50)
);