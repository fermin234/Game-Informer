const { Router } = require("express");
const genres = require("./genres/genres.js");
const platforms = require("./platforms/platforms.js");
const validatePassword = require("./helper");
const videogames = require("./videoGames");

const router = Router();

router.use("/genres", genres);

router.use("/platforms", platforms);

router.use("/validatePassword", validatePassword);

router.use("/videogames", videogames);

module.exports = router;
