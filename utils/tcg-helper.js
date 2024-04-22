const express = require('express');
const sequelize = require('../config/connection')



//function to verify user input is legitimate
function isValidPokemon() { 
    const pokeInput = req.query.name;
    if (!pokeInput) {
        throw new Error('Please provide a pokemon name');
    }
    
    const allowLetters = /^[a-zA-Z]+$/; // Match only letters from start to end
    if (allowLetters.test(pokeInput)) {
        return true; // Return true if input is valid
    } else {
        throw new Error('Please only use uppercase and lowercase characters and try again.');
    }
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions

//constructs fetch URL
function constructUrl(pokeInput) {
    const baseUrl = 'https://api.pokemontcg.io/v2/cards?q=name:';
    return `${baseUrl}${pokeInput}*`;
}
//fetches the pokemon data
async function fetchPokemonData() {
    try {
        const url = constructUrl(pokeInput);
        const response = await fetch(url);
            if (!response.ok) {
                throw new Error('failed to fetch pokemon data.');
            }
        const pokeData = await response.json();
            return pokeData;
    } catch (error) {
        console.error(error)
        throw new Error('failed to fetch pokemonData')
    }
};

//


module.exports = {
    isValidPokemon,
    constructUrl,
    fetchPokemonData
    
};