const router = require('express').Router();

// import routers
const TCGRouter = require('./TCG');
const PokemonRouter = require('./pokeAPI');
const loginRouter = require('./login');
const userRoutes = require('./userRoutes');

// mount routers onto the parent router
router.use('/tcg', TCGRouter);
router.use('/pokemon', PokemonRouter);
router.use('/auth', loginRouter);
router.use('/users', userRoutes);

module.exports = router;