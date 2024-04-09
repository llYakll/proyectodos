const express = require('express');
const router = express.Router();


// import routers
const TCGRouter = require('./TCG');
const PokemonRouter = require('./pokeAPI');
const loginRouter = require('./login')
// mount routers onto the parent router
router.use('/tcg', TCGRouter);
router.use('/pokemon', PokemonRouter);
router.use('/auth', loginRouter);

module.exports = router