const express = require('express');
const router = express.Router();
const { isValidPokemon, constructUrl, fetchPokemonData } = require('../../utils/tcg-helper')

// import routers
const TCGRouter = require('./TCG');
// const PokemonRouter = require('./pokeAPI');
// const loginRouter = require('./login');
const userRoutes = require('./userRoutes');

// mount routers onto the parent router
router.use('/tcg', TCGRouter);
// router.use('/pokemon', PokemonRouter);
// router.use('/auth', loginRouter);
router.use('/users', userRoutes);

router.get('/fetch', isValidPokemon, constructUrl, fetchPokemonData (req, res) => {
    res.json({
        pokemonData: req.pokemonData,
        cardImage: req.largeImageUrl
    })
});

module.exports = Router;