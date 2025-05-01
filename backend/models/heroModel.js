const pool = require("../config/db");

// Retrieve all background options
async function getBackgroundsModel() {
  const [rows] = await pool.query(
    "SELECT id, title, description, attributes FROM backgrounds"
  );
  // assuming attributes stored as JSON
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    attributes: JSON.parse(r.attributes),
  }));
}

// Retrieve avatars filtered by race
async function getAvatarsModel(race) {
  const [rows] = await pool.query(
    "SELECT id, image_url AS imageUrl FROM avatars WHERE race = ?",
    [race]
  );
  return rows.map((r) => ({ id: r.id, imageUrl: r.imageUrl }));
}

// Fetch a user's hero
async function getHeroModel(userId) {
  const [rows] = await pool.query(
    `SELECT h.id, h.name, h.race, b.id AS backgroundId, b.title AS backgroundTitle,
            h.avatar_id AS avatarId, h.level, h.image_url AS imageUrl, b.description, b.attributes
     FROM heroes h
     JOIN backgrounds b ON h.background_id = b.id
     WHERE h.user_id = ?`,
    [userId]
  );
  if (!rows.length) return null;
  const r = rows[0];
  return {
    id: r.id,
    name: r.name,
    race: r.race,
    background: {
      id: r.backgroundId,
      title: r.backgroundTitle,
      description: r.description,
      attributes: JSON.parse(r.attributes),
    },
    avatarId: r.avatarId,
    level: r.level,
    imageUrl: r.imageUrl,
  };
}

// Create a new hero entry
async function createHeroModel(userId, { name, race, background, avatar }) {
  const [result] = await pool.query(
    "INSERT INTO heroes (user_id, name, race, background_id, avatar_id, level, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [userId, name, race, background, avatar, 1, null]
  );
  return getHeroModel(userId);
}

module.exports = {
  getBackgroundsModel,
  getAvatarsModel,
  getHeroModel,
  createHeroModel,
};
