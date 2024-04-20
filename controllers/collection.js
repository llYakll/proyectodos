const express = require('express');
const router = express.Router();
const createCollection = require('../utils/collections'); 


router.post('/collections', async (req, res) => {
    try {
        const collection = await createCollection(req.body); 
        res.status(201).json(collection);
    } catch (error) {
        console.error('Error creating collection:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/user-collection', (req, res) => {
    res.json({ userCollection: req.userCollection });
});



module.exports = collectionRoutes;