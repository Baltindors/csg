-- backend/db/migrations/005_create_backgrounds_table.sql
CREATE TABLE IF NOT EXISTS backgrounds (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  attributes  JSON NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);