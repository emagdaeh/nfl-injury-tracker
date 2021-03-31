const express = require('express');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
const database = require('../database');
const KEYS_AND_SECRET = require('./config.js');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

// const options = {
//   url: 'https://nfl.com/v1',
//   headers: {
//     Authorization: `Bearer ${KEYS_AND_SECRET.NFL_API_KEY}`,
//     'content-type': 'application/json',
//   },
// };

// app.get('/api/playersInfo', (req, res) => {
//   axios
//     .get(`${options.url}/persons?fs={id,firstName,lastName,playerStats{careerStats{passingStats{attempts,completions},rushingStats{attempts,yardsPerAttempt}}}}&s={"$query":{"firstName" : "Tom","lastName" : "Brady"}}`, options)
//     .then((results) => {
//       console.log('results: ', results);
//       // res.send(results.data);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// });

app.get('/api/playersInfo/:player', (req, res) => {
  const name = req.params.player;

  const playerStr = 'SELECT position, player, players.team, gamesPlayed, gamesMissed, questionablePerSeason, doubtfulPerSeason, outPerSeason FROM players, teams WHERE players.player = $1 AND players.team = teams.name';

  database.query(playerStr, [name], (err, data) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.send(data.rows[0]);
    }
  });
});

app.post('/api/addPlayer', (req, res) => {
  const {
    position,
    player,
  } = req.body;

  const playerStr = 'INSERT INTO favoritePlayer (position, player) VALUES ($1, $2)';

  database.query(playerStr, [position, player], (err) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.send(201);
    }
  });
});

app.get('/api/getRoster', (req, res) => {
  const rosterStr = 'SELECT * FROM favoritePlayer';

  database.query(rosterStr, (err, data) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.send(data.rows[0]);
    }
  });
});

app.delete('/api/removePlayer?:player', (req, res) => {
  const { player } = req.query.player;

  const deleteStr = 'DELETE FROM favoritePlayer WHERE player = $1';

  database.query(deleteStr, [player], (err) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
