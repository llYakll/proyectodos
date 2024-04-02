//import modules
const express = require('express');
const fetch = require('node-fetch');

//create express router
const router = express.Router();

//Define API route to retrieve pokemon information
router.get('/pokemon/:name', async (req, res) => {
    try {
        const { name } = req.params;                                          // destructureing name from req.params and creating a variable called 'name'
        const apiURL = `https://pokeapi.co/api/v2/pokemon/${name}`;          // constructs the API URL to fetch Pokémon data based on name i.e. "cyndaquil'"
        const response = await fetch(apiURL);                               //makes a fetch request to pokeapi for poke name and wait for its response
    if (!response.ok) {                                                    //checks if response from pokeapi/api/v2/pokemon/name returns a 200-299 code
    throw new Error('failed to fetch pokemons name from pokeAPI');         //if it returns a 200-299 throw error
}
        const pokemonData = await response.json();    //returns promised json data after parsing it
            res.json(pokemonData); // sends named pokemons data back to client as a json
} catch (error) {
console.error(error);
res.status(500).json({ error: 'error returning object data from specified endpoint.'})
    }
});

module.exports = router; //exports the router instance

