const { Router } = require('express');
const RoutesVideoGames = require('./RoutesVideoGames.js');
const RoutesGenres = require('./RoutesGenres.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/genres', RoutesGenres);
router.use('/videogames', RoutesVideoGames);

module.exports = router;
