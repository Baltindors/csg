-- backend/db/migrations/006_create_avatars_table.sql
CREATE TABLE IF NOT EXISTS avatars (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  race       VARCHAR(50) NOT NULL,
  image_url  VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);