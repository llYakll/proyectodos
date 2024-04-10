const {sequelize} = require('../config/connection'); // Assuming this is the correct path to your Sequelize connection
const Pokemon = require('../models/pokemon'); // Assuming this is the correct path to your Pokemon model
const fetch = require('node-fetch'); // Import fetch for Node.js environment

async function fetchPokemonData() {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1025';
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data from PokeAPI:', error);
      return [];
    }
}

async function seedPokemonTable() {
  try {
    // Fetch data from PokeAPI
    const monData = await fetchPokemonData();

    // Insert data into the Pokemon table
    await Pokemon.bulkCreate(monData.map((pokemon, index) => ({
      pokeID: index + 1, // Assuming the national dex number starts from 1
      name: pokemon.name
    })));

    console.log('Pokemon table seeded successfully.');
  } catch (error) {
    console.error('Error seeding Pokemon table:', error);
  } finally {
    // Close the Sequelize connection
    await sequelize.close();
    console.log('Connection closed.');
  }
}

seedPokemonTable();