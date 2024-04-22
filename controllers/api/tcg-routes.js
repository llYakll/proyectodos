const express = require('express');
const TCGRoutes = express.Router();
const { isValidPokemon, constructUrl, fetchPokemonData, } = require('../../utils/tcg-helper');
const pokeInput = req.query

TCGRoutes.get('/search', isValidPokemon, constructUrl, fetchPokemonData, (req, res) => {
    res.json({
        pokemonData: req.pokemonData,
        cardImage: req.largeImageUrl
    });
});
module.exports = TCGRoutes;