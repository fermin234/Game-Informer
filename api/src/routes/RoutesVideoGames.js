const { Router } = require("express");
const router = Router();
const {
  getAllVideoGames,
  getVideoGameName,
  getVideoGameId,
  createVideoGame,
  getScreenshotsGame,
  deleteVideoGame,
} = require("./controllers.js");

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    name
      ? res.json(await getVideoGameName(name))
      : res.json(await getAllVideoGames());
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.get("/screenShots/:idVideoGame", async (req, res) => {
  try {
    // return res.json("asd");
    res.json(await getScreenshotsGame(req.params));
  } catch (error) {
    res.json(error);
  }
});

router.get("/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;
    res.json(await getVideoGameId(idVideogame));
  } catch (error) {
    res.status(404).json(error.message);
  }
});

//falta relacionar los generos
router.post("/", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    platforms,
    genres,
    image,
    created,
  } = req.body;
  try {
    if (!name) throw new Error("Debe ingresar un nombre.");
    if (!description) throw new Error("Debe ingresar una descripcion.");
    res.json(
      await createVideoGame(
        name,
        description,
        released,
        rating,
        platforms,
        genres,
        image,
        created
      )
    );
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.delete("/deleteVideoGame/:idVideoGame", async (req, res) => {
  try {
    res.json(await deleteVideoGame(req.params));
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
