const express = require('express');
const router = express.Router();


const getPokemon = async (req, res, next) => {
    try {
        const { name } = req.params;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!response.ok) {
            throw new Error('Pokemon not found');
        }

        const pokemonData = await response.json();
        req.pokemonData = pokemonData;
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

router.get('/pokemon/:name', getPokemon, (req, res) => {
    const { pokemonData } = req;
    res.json(pokemonData);
});
//recieve error from next and send 500 err
router.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = router;