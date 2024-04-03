//import modules
const express = require('express');
const router = express.Router();

router.get(`/v2/cards`, async (req, res) => {
    try {
        const { name } =req.query;
        const apiURL = `https://api.pokemontcg.io/v2/cards/?q=name:${name}`;
        const response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('failed to fetch pokemons card data from PokemonTCG API');
        }
        const pokemonData = await response.json();
            res.json(pokemonData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error returning object data from specified endpoint.'})
    }
});

module.exports = router;





