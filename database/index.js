const { Pool } = require('pg');

// const pool = new Pool({
//   user: 'adamwhitman',
//   host: 'localhost',
//   // host: 'host.docker.internal',
//   database: 'sdcreviews',
//   port: 5432,
// });

const pool = new Pool({
  user: 'adamwhitman',
  host: 'localhost',
  database: '',
  password: '',
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