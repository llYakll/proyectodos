const express = require('express');
const router = express.Router();
const { isValidPokemon, constructUrl, fetchPokemonData, } = require('../../utils/tcg-helper');
const pokeInput = 'pikachu';//document.getElementById('pokeInput'); or req.query?

router.get('/fetch', isValidPokemon, constructUrl, fetchPokemonData, (req, res) => {
    res.json({
        pokemonData: req.pokemonData,
        cardImage: req.largeImageUrl
    });
});
module.exports = TCGRouter;