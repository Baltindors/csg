const pool = require('../config/db');

async function createUser(email, hashedPassword) {
  const [res] = await pool.query(
    'INSERT INTO users (email, password) VALUES (?, ?)',
    [email, hashedPassword]
  );
  return { id: res.insertId, email };
}

async function getUserByEmail(email) {
  const [rows] = await pool.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );
  return rows[0];
}

module.exports = { createUser, getUserByEmail };