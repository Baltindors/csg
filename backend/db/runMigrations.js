// backend/db/runMigrations.js
const fs   = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function run() {
  // 1) Connect without a default database
  const conn = await mysql.createConnection({
    host:     process.env.DB_HOST,
    port:     +process.env.DB_PORT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: false,  // no need for multipleStatements
  });

  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  // 2) Run the first migration (creating the database)
  const first = files.shift();
  const sql1 = fs.readFileSync(path.join(migrationsDir, first), 'utf8');
  await conn.query(sql1);
  console.log(`✔️  Ran ${first}`);

  // 3) Switch this connection into your new DB
  await conn.changeUser({ database: process.env.DB_NAME });
  console.log(`🔀 Switched to database ${process.env.DB_NAME}`);

  // 4) Run the rest of the migrations (now against csg_db)
  for (let file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
    await conn.query(sql);
    console.log(`✔️  Ran ${file}`);
  }

  await conn.end();
  console.log('✅ All migrations complete.');
}

run().catch(err => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
