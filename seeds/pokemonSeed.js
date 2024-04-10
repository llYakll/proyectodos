const sequelize = require('../config/connection');
const Pokemon = require('../models/pokemon');
const fetch = require('node-fetch');

async function fetchPokemonData() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1025';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch Pokemon data');
        }
        
        const data = await response.json();
        return data.results.map(pokemon => pokemon.name);
    } catch (error) {
        console.error('Error fetching data from PokeAPI:', error);
        return [];
    }
};

async function seedPokemonTable() {
    try {
        // Fetch data from PokeAPI
        const monData = await fetchPokemonData();

        // Insert data into the Pokemon table
        await Pokemon.bulkCreate(monData.map((pokemon, index) => ({
            pokeID: index + 1,
            name: pokemon.name
        })));

        console.log('Pokemon table seeded successfully.');
    } catch (error) {
        console.error('Error seeding Pokemon table:', error);
    } finally {
        await sequelize.close();
        console.log('Connection closed.');
    };
};

module.exports = seedPokemonTable;