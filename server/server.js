const express = require('express');
const axios = require('axios');
const path = require('path');
const morgan = require('morgan');
// const database = require('../database');
const TOKEN = require('./config.js');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/playersInfo', (req, res) => {
  axios
    .post('https://api.nfl.com/oauth/token')
    .then((results) => res.send(results))
    .catch((error) => {
      console.log('Error: ', error);
    });
});

app.listen(port, () => {
  console.log(`Reviews service listening at http://localhost:${port}`);
});
