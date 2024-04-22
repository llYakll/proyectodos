const express = require('express');
const collectionRoutes = express.Router();
const createCollection = require('../utils/collections'); 


collectionRoutes.post('/collections', async (req, res) => {
    try {
        const collection = await createCollection(req.body); 
        res.status(201).json(collection);
    } catch (error) {
        console.error('Error creating collection:', error);
        res.status(500).json({ message: 'error fetching collection' });
    }
});

collectionRoutes.get('/collections', (req, res) => {
    res.json({ userCollection: req.userCollection });
});



module.exports = collectionRoutes;