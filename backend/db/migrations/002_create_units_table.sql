-- 002_create_units_table.sql

CREATE TABLE IF NOT EXISTS units (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  name     VARCHAR(50) NOT NULL,
  strength INT DEFAULT 1,
  defense  INT DEFAULT 1,
  speed    INT DEFAULT 1
);
