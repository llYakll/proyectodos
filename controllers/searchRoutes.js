const router = require('express').Router();
const { Card } = require('../models');
const axios = require('axios');

const subtypes = [
    `BREAK`,
    `Baby`,
    `Basic`,
    `EX`,
    `GX`,
    `Goldenrod Game Corner`,
    `Item`,
    `LEGEND`,
    `Level-Up`,
    `MEGA`,
    `Pokémon Tool`,
    `Pokémon Tool F`,
    `Rapid Strike`,
    `Restored`,
    `Rocket's Secret Machine`,
    `Single Strike`,
    `Special`,
    `Stadium`,
    `Stage 1`,
    `Stage 2`,
    `Supporter`,
    `TAG TEAM`,
    `Technical Machine`,
    `V`,
    `VMAX`
];

router.get('/', async (req, res) => {
    try {
        res.render('search', { subtypes: subtypes, logged_in: req.session.logged_in});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route for searching cards
router.post('/', async (req, res) => {
    try {
        const { card_name, card_subtypes } = req.body;
        let apiUrl = `https://api.pokemontcg.io/v2/cards?q=`;

        if (card_name) {
            apiUrl += `name:${card_name}*&`;
        }

        if (card_subtypes) {
            apiUrl += `subtypes:"${card_subtypes}"&`;
        }

        // Remove trailing '&' if it exists
        if (apiUrl.endsWith('&')) {
            apiUrl = apiUrl.slice(0, -1);
        }

        console.log('API URL:', apiUrl);

        // Set a timeout of 10 seconds (10000 milliseconds) because TCG API can take up to 10 seconds
        const config = {
            timeout: 10000
        };

        // Make request to TCG API using Axios
        const response = await axios.get(apiUrl, config);
        
        if (response.status !== 200) {
            throw new Error('Error searching for cards');
        }

        const cards = response.data.data;

        // Render search results page with the retrieved card data and subtypes
        res.render('search', { cards: cards, subtypes: subtypes, logged_in: req.session.logged_in });
    } catch (error) {
        console.error('Error searching cards:', error);
        res.status(500).json({ error: 'An error occurred while searching for cards.' });
    }
});

router.post('/collection', async (req, res) => {
    try {
        const { card_id, user_id } = req.body;

        const card = await Card.findByPk(card_id);
        if(!card) {
            return res.status(404).json({ error: 'Card not found.' });
        }

        await card.saveToCollection(user_id);

        res.status(200).json({ message: 'Card added to collection successfully.' });
    } catch (error) {
        console.error('Error adding card to collection:', error);
        res.status(500).json({ error: 'An error occured while adding the card to the collection.'});
    }
});

module.exports = router;