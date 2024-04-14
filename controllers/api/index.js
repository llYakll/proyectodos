const express = require('express');
const router = express.Router();
const { isValidPokemon, constructUrl, fetchPokemonData } = require('../../utils/tcg-helper')



router.get('/fetch', isValidPokemon, constructUrl, fetchPokemonData (req, res) => {
    res.json({
        pokemonData: req.pokemonData,
        cardImage: req.largeImageUrl
    })
});

module.exports = tcgRouter;