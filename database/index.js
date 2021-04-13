const { Pool } = require('pg');

const pool = new Pool({
  user: 'adamnfl',
  host: 'localhost',
  database: 'roster',
  password: 'Freemind4@',
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to PostgreSQL Database');
  }
});

module.exports = pool;
