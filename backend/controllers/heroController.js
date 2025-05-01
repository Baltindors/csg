const {
  getBackgroundsModel,
  getAvatarsModel,
  createHeroModel,
  getHeroModel,
} = require("../models/heroModel");

// Fetch all available backgrounds
async function getBackgrounds(req, res, next) {
  try {
    const backgrounds = await getBackgroundsModel();
    res.json(backgrounds);
  } catch (err) {
    next(err);
  }
}

// Fetch avatars filtered by race
async function getAvatars(req, res, next) {
  try {
    const { race } = req.query;
    const avatars = await getAvatarsModel(race);
    res.json(avatars);
  } catch (err) {
    next(err);
  }
}

// Fetch the hero for the authenticated user
async function getHero(req, res, next) {
  try {
    const userId = req.user.id;
    const hero = await getHeroModel(userId);
    res.json(hero);
  } catch (err) {
    next(err);
  }
}

// Create a new hero record
async function createHero(req, res, next) {
  try {
    const userId = req.user.id;
    const heroData = req.body;
    const newHero = await createHeroModel(userId, heroData);
    res.status(201).json(newHero);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getBackgrounds,
  getAvatars,
  getHero,
  createHero,
};
