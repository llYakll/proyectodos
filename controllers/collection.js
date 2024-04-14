

const  saveToCollection  = require('../utils/tcg-helper');

router.post('/save', async (req, res) => {
    try {
        const { userID, cardID, quantity, avgPrice } = req.body;
        if (!userID || !cardID || !quantity || !avgPrice) {
            return res.status(400).send('Missing required parameters.');
        }
        const result = await saveToCollection(userID, { cardID, quantity, avgPrice });
        res.status(201).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});