const express = require('express');
const router = express.Router();
const { isValidPokemon, constructUrl, fetchPokemonData } = require('../../utils/tcg-helper');
const pokeInput = 'pikachu';//document.getElementById('pokeInput');
//am i doing too much? do i need seperate routes for each function?
router.get('/fetch-pokemon', async (req, res) => {
    try {
        const { pokeInput } = req.query;
        if (!pokeInput) {
            return res.status(400).json({ message: 'No Pokemon name provided.' });
        }

        
        // Validate the Pokemon name
        try {
            isValidPokemon(pokeInput);
        } catch (error) {
            return res.status(400).json({ message: 'input is not valid, please only use letters'});
        }

       
       
       // Construct URL and fetch data
        const url = constructUrl(pokeInput);
        try {
            const pokemonData = await fetchPokemonData(url);
            res.json(pokemonData);
        } catch (error) {
            res.status(500).json({ message: 'Failed to retrieve Pokemon data.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}); 

module.exports = TCGRouter;