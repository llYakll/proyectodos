const express = require('express');
const router = express.Router();


const getCard = async (req, res, next) => {
    try {
        const { name } = req.query;
        const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${name}`);

        if (!response.ok) {
            throw new Error('Card not found');
        }

        const cardResponse = await response.json();
        const cards = cardResponse.data;
        req.cardData = cards;
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

router.get('/cards', getCard, (req, res) => {
    const { cardData } = req;
    res.json(cardData);
});
//use err from next and res with status 500
router.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = router;

//need query for subtypes of card