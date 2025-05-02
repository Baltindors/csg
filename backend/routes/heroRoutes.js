// backend/routes/heroRoutes.js
const express = require("express");
const router = express.Router();
const {
  getBackgrounds,
  getAvatars,
  getHero,
  createHero,
} = require("../controllers/heroController");

// All of these handlers expect (req, res, next)
router.get("/backgrounds", getBackgrounds);
router.get("/avatars", getAvatars);
router.get("/", getHero);
router.post("/", createHero);

module.exports = router;
