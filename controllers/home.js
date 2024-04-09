const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const [cardResponse, pokemonResponse] = await Promise.all([
            fetch('https://api.pokemontcg.io/v2/cards?q=name:mew'),
            fetch('https://pokeapi.co/api/v2/pokemon/mew')
        ]);

        if (!cardResponse.ok) {
            throw new Error(`Failed to fetch Pokémon TCG card data: ${cardResponse.status} ${cardResponse.statusText}`);
        }

        if (!pokemonResponse.ok) {
            throw new Error(`Failed to fetch Pokémon data from PokeAPI: ${pokemonResponse.status} ${pokemonResponse.statusText}`);
        }

        const cardData = await cardResponse.json();
        const pokemonData = await pokemonResponse.json();

        if (!cardData || !cardData.data || cardData.data.length === 0) {
            throw new Error('No Pokémon TCG card found for Mew');
        }

        const cardImage = cardData.data[0].images.small;

        const { name, height, weight, sprites, types, abilities, stats } = pokemonData;
        //check for type, if type doesnt exist return an empty string
        const type_one = types.length >= 1 ? types[0].type.name : '';
        const type_two = types.length >= 2 ? types[1].type.name : '';
        //1=2              0=1
        const abilitiesData = abilities.map(ability => ({
            name: ability.ability.name,
            is_hidden: ability.is_hidden
        }));

        const statsData = {};
        stats.forEach(stat => {
            statsData[stat.stat.name] = stat.base_stat;
        });

        const pokemonInfo = {
            name,
            height,
            weight,
            image: sprites.front_default,
            type_one,
            type_two,
            abilities: abilitiesData,
            stats: statsData
        };

        res.json({
            cardImage,
            pokemonInfo
        });
    } catch (error) {
        console.error('Error fetching Pokémon data:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;