-- backend/db/migrations/006_create_heroes_table.sql
CREATE TABLE IF NOT EXISTS heroes (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  name          VARCHAR(100) NOT NULL,
  race          VARCHAR(50) NOT NULL,
  background_id INT NOT NULL,
  avatar_id     INT NOT NULL,
  level         INT DEFAULT 1,
  image_url     VARCHAR(255),
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (background_id) REFERENCES backgrounds(id),
  FOREIGN KEY (avatar_id) REFERENCES avatars(id)
);