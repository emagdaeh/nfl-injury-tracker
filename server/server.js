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

app.get('/api/playersInfo?:player', (req, res) => {
  const name = req.query.name;
  const position = req.query.position;

  const playerStr = 'SELECT player, position FROM roster WHERE player = $1, position = $2';

  database.query(playerStr, [name, position], (err, data) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.send(data.rows[0]);
    }
  });
});

app.post('/api/favoritePlayer', (req, res) => {
  const { position, player } = req.body;

  const playerStr = 'INSERT INTO roster (position, player) VALUES ($1, $2)';

  database.query(playerStr, [position, player], (err, res) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.send(201);
    }
  });
});

app.listen(port, () => {
  console.log(`Reviews service listening at http://localhost:${port}`);
});
