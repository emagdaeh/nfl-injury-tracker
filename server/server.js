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

app.get('/api/playersInfo', (req, res) => {
  axios
    // .post(`https://api.nfl.com/oauth/token/grant_type=client_credentials&client_id=${KEYS_AND_SECRET.client_id}&client_secret=${KEYS_AND_SECRET.secret}`)
    // .post(`http://api.nfl.com/oauth/token`)
    .post(`https://api.nfl.com/oauth/token`, { grant_type: 'client_credentials', client_id: `${KEYS_AND_SECRET.client_id}`, client_secret: `${KEYS_AND_SECRET.secret}` })
    .then((results) => {
      console.log('results: ', results);
      res.send(results.access_token);
    })
    .catch((error) => {
      console.log(error);
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
