require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mysql = require('mysql2/promise')
const authRoutes = require('./routes/authRoutes');


const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes);

// create a MySQL connection pool
const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
})

app.get('/health', (req, res) => res.json({ status: 'OK' }))

// example endpoint: list all units
app.get('/api/units', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM units')
    res.json(rows)
  } catch (err) {
    next(err)
  }
})

// start server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`)
})
