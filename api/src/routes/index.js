const { Router } = require("express");
const RoutesVideoGames = require("./RoutesVideoGames.js");
const RoutesGenres = require("./RoutesGenres.js");

const router = Router();

router.use("/genres", RoutesGenres);
router.use("/videogames", RoutesVideoGames);

module.exports = router;
