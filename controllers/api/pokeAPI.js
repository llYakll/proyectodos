const express = require('express');  // import the Express framework
const fetch = require('node-fetch'); // import the fetch library to make HTTP requests
const router = express.Router();     // create a new Express router to define routes

const getPokemon = async (req, res, next) => { // define an asynchronous function called getPokemon to handle the request
    try {
        const { name } = req.params; // extract the 'name' parameter from the request URL (e.g., /pokemon/:name)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`); // make an HTTP GET request to the PokeAPI with the provided name

        if (!response.ok) { // check if the response is not successful
            throw new Error('Pokémon not found'); // throw an error if the Pokémon is not found
        }

        const pokemonData = await response.json(); // parse the response body as JSON data
        const { height, weight, types, abilities, sprites } = pokemonData; // extract specific data from the fetched Pokémon data

        // transform the abilities array to a simpler format
        const formattedAbilities = abilities.map((ability) => ({
            name: ability.ability.name,
            isHidden: ability.is_hidden
        }));

        // extract only the type names from the types array
        const formattedTypes = types.map((type) => type.type.name);

        // get the URL of the official artwork sprite
        const spriteUrl = sprites.other['official-artwork'].front_default;

        // create a response object with the desired data
        const responseData = {
            name: pokemonData.name,
            height: height,
            weight: weight,
            types: formattedTypes,
            abilities: formattedAbilities,
            spriteUrl: spriteUrl
        };

        req.pokemonData = responseData; // attach the response data to the request object
        next(); // move to the next middleware or route handler
    } catch (error) {
        console.error(error); // log any errors to the console
        next(error); // pass the error to the error-handling middleware
    }
};

// define a route that handles GET requests to /pokemon/:name
router.get('/pokemon/:name', getPokemon, (req, res) => {
    const { pokemonData } = req; // retrieve the processed Pokémon data from the request object
    const { spriteUrl } = pokemonData; // extract the sprite URL from the Pokémon data

    // Redirect the client to the official artwork sprite URL
    res.redirect(spriteUrl);
});

// error-handling middleware to catch and handle server errors
router.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error' }); // respond with a 500 status code and an error message
});

module.exports = router; // export the router module for use in other parts of the application