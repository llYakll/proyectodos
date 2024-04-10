const express = require('express');
const router = express.Router();

const db = require('../db'); // Import database connection

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        next(); // User is authenticated
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};

// route to get the user's Pokémon card collection
router.get('/collection', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.userId;

        // Fetch all cards associated with the user from the database
        const userCollection = await db.query(
            'SELECT * FROM user_collection WHERE userId = ?',
            [userId]
        );

        if (userCollection.length === 0) {
            return res.status(404).json({ message: 'No collection found. Please search for a card to add to your collection.' });
        }

        res.json(userCollection);
    } catch (error) {
        console.error('Error fetching user collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to search and select a Pokémon card from the TCG API
router.get('/search', isAuthenticated, async (req, res) => {
    try {
        const { query } = req.query;

        // fetch card data from the TCG API
        const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=${query}`);
        const { data: cards } = await response.json();

        if (!cards || cards.length === 0) {
            return res.status(404).json({ message: 'No cards found for the given search query' });
        }

        // Format the cards data with image and average sell price
        const formattedCards = cards.map((card) => ({
            id: card.id,
            name: card.name,
            imageUrl: card.images.small,
            averageSellPrice: card.tcgplayer.prices.normal.market
        }));

        res.json(formattedCards);
    } catch (error) {
        console.error('Error searching for cards:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route to save Pokémon cardto the users collection with specified quantity
router.post('/collection/save', isAuthenticated, async (req, res) => {
    try {
        const { userId, cardId, cardName, imageUrl, price, quantity } = req.body;

        // Check if the card already exists in the user's collection
        const existingCard = await db.query(
            'SELECT * FROM user_collection WHERE userId = ? AND cardId = ?',
            [userId, cardId]
        );

        if (existingCard.length > 0) {
            // If card exists update the quantity
            await db.query(
                'UPDATE user_collection SET quantity = quantity + ? WHERE userId = ? AND cardId = ?',
                [quantity, userId, cardId]
            );
        } else {
            // If card does not exist insert a new record
            await db.query(
                'INSERT INTO user_collection (userId, cardId, cardName, imageUrl, price, quantity) VALUES (?, ?, ?, ?, ?, ?)',
                [userId, cardId, cardName, imageUrl, price, quantity]
            );
        }

        res.json({ message: 'Card(s) saved to collection successfully' });
    } catch (error) {
        console.error('Error saving card(s) to user collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// delete a Pokemoin card from the users collection
router.delete('/collection/:cardId', isAuthenticated, async (req, res) => {
    try {
        const { cardId } = req.params;

        //query to delete the card from the user's collection
        await db.query(
            'DELETE FROM user_collection WHERE cardId = ?',
            [cardId]
        );

        res.json({ message: 'Card deleted from collection successfully' });
    } catch (error) {
        console.error('Error deleting card from user collection:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;