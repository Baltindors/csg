const express = require("express");
const router = express.Router();
const {
  getBackgrounds,
  getAvatars,
  createHero,
  getHero,
} = require("../controllers/heroController");

// Get all available hero backgrounds
router.get("/backgrounds", async (req, res, next) => {
  try {
    const backgrounds = await getBackgrounds();
    res.json(backgrounds);
  } catch (err) {
    next(err);
  }
});

// Get avatars for a specific race
router.get("/avatars", async (req, res, next) => {
  try {
    const race = req.query.race;
    const avatars = await getAvatars(race);
    res.json(avatars);
  } catch (err) {
    next(err);
  }
});

// Get the current user's hero
router.get("/", async (req, res, next) => {
  try {
    // assume req.user.id is set by auth middleware
    const hero = await getHero(req.user.id);
    res.json(hero);
  } catch (err) {
    next(err);
  }
});

// Create a new hero record
router.post("/", async (req, res, next) => {
  try {
    const heroData = req.body;
    const newHero = await createHero(req.user.id, heroData);
    res.status(201).json(newHero);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
