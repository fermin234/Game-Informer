const { Router } = require('express');
const router = Router();
const {
  getAllVideoGames,
  getVideoGameName,
  getVideoGameId,
  createVideoGame,
} = require('./controllers.js');

router.get('/', async (req, res) => {
  const { name } = req.query;
  try {
    name
      ? res.json(await getVideoGameName(name))
      : res.json(await getAllVideoGames());
  } catch (error) {
    res.status(404).json(error.message);
  }
});

router.get('/:idVideogame', async (req, res) => {
  const { idVideogame } = req.params;
  try {
    res.json(await getVideoGameId(idVideogame));
  } catch (error) {
    res.status(404).json(error.message);
  }
});

//falta relacionar los generos
router.post('/', async (req, res) => {
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
    console.log('el input que llega: ', {
      name,
      description,
      released,
      rating,
      platforms,
      genres,
      image,
      created,
    });
    if (!name) throw new Error('Debe ingresar un nombre.');
    if (!description) throw new Error('Debe ingresar una descripcion.');
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

module.exports = router;
