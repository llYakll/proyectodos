const express = require('express');
const router = express.Router();
const createCollection = require('../utils/collections'); 

///unsure where the function is that i can use here so withAuth is a placeholder
//do i even need with auth since without a user id the user cant save?

router.post('/collections', withAuth, async (req, res) => {
    try {
        const collection = await createCollection(req.body); 
        res.status(201).json(collection);
    } catch (error) {
        console.error('Error creating collection:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/user-collection', withAuth, (req, res) => {
    res.json({ userCollection: req.userCollection });
});



module.exports = collectionRoutes;