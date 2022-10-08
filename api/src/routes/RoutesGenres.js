const { Router } = require('express');
const router = Router();
const { getGenres } = require('./controllers.js');

router.get('/', async (req, res) => {
  try {
    res.json(await getGenres());
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;
