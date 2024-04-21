const router = require('express').Router();
const { Collection, Card, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/allCollections', async (req, res) => {
    try {
        const collections = await Collection.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'], // Only retrieve the username of the user
                },
                {
                    model: Card,
                },
            ],
        });
        res.status(200).json(collections);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', withAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.user_id, {
            include: {
                model: Collection,
                include: [{ model: Card }],
            }
        });

        console.log('User:', user.collection.cards);

        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }

        const { collection } = user;

        // console.log('Collection:', collection.cards);
        const cards = collection.cards.map(card => card.toJSON());


        let totalAveragePrice = 0;
        let totalQuantity = cards.length;

        collection.cards.forEach((card) => {
            totalAveragePrice += parseFloat(card.average_sell_price);
        });

        res.render('collection', {
            userCollection: collection.cards,
            totalAveragePrice,
            totalQuantity,
            logged_in: req.session.logged_in,
        });
    } catch (error) {
        console.error('Error rendering collection:', error);
        res.status(500).json({ error: 'An error occured while rendering the collection.'});
    }
});

router.post('/add', withAuth, async (req, res) => {
    const { card_id, quantity } = req.body;

    try {
        const card = await Card.findByPk(card_id);
        if (!card) {
            return res.status(404).json({ error: 'Card not found.' });
        }

        const user = await User.findByPk(req.session.user_id, {
            include: Collection,
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const collection = user.collection;

        await collection.addCard(card, { through: { quantity } });

        res.status(200).json({ message: 'Card added to collection successfully.' });
    } catch (error) {
        console.error('Error adding card to collection:', error);
        res.status(500).json({ error: 'An error occurred while adding the card to the collection.' });
    }
});

router.post('/update', withAuth, async (req, res) => {
    const { card_id, user_id, quantity } = req.body;

    try {
        const collectionEntry = await Collection.findOne({
            where: {
                user_id: user_id,
                card_id: card_id
            }
        });

        if (!collectionEntry) {
            return res.status(404).json({ error: 'Collection entry not found.' });
        }

        await collectionEntry.update({ quantity });

        res.status(200).json({ message: 'Quantity updated successfully.' });
    } catch (error) {
        console.error('Error updating quantity:', error);
        res.status(500).json({ error: 'An error occurred while updating quantity.' });
    }
});

router.post('/delete', withAuth, async (req, res) => {
    const { card_id, user_id } = req.body;

    try {
        const collectionEntry = await Collection.findOne({
            where: {
                user_id: user_id,
                card_id: card_id
            }
        });

        if (!collectionEntry) {
            return res.status(404).json({ error: 'Collection entry not found.' });
        }

        await collectionEntry.destroy();

        res.status(200).json({ message: 'Card deleted from collection successfully.' });
    } catch (error) {
        console.error('Error deleting card from collection:', error);
        res.status(500).json({ error: 'An error occurred while deleting the card from the collection.' });
    }
});

module.exports = router;