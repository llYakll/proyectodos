
const getCards = async (req, res) => {
    try {
        const { name } = req.query;

        // Check if Pokemon name is provided
        if (!name) {
            throw new Error('A name is required');
        }

        // Construct API URL with the provided name
        const apiUrl = `https://api.pokemontcg.io/v2/cards?q=name:${name}*`; 

        // Fetch data from the constructed URL
        const response = await fetch(apiUrl);

        // Check if the response is successful, otherwise throw an error
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon from the API');
        }

        // Parse response as JSON
        const pokeResponse = await response.json();

        // Send the Pokémon JSON data to the client
        res.json(pokeResponse);
    } catch (error) {
        console.error('Error fetching card data', error);
        res.status(500).json({ error: 'Failed to fetch Pokémon data' });
    }
};

module.exports = {
    getCards
};