DROP TABLE IF EXISTS players;
DROP TABLE IF EXISTS teams;
DROP TABLE IF EXISTS favoritePlayer;

CREATE TABLE players (
  id SERIAL PRIMARY KEY,
  position VARCHAR(2),
  player VARCHAR(75),
  team VARCHAR(20),
  gamesPlayed INTEGER,
  gamesMissed INTEGER
);

CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  city VARCHAR (20),
  name VARCHAR (20),
  questionablePerSeason INTEGER,
  doubtfulPerSeason INTEGER,
  outPerSeason INTEGER
);

CREATE TABLE favoritePlayer (
  id SERIAL PRIMARY KEY,
  position VARCHAR(2),
  player VARCHAR(50)
);