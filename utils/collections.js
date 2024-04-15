const Collection  = require('../models/collection'); 


async function createCollection(collectionData) {
    const { user_id, card_id, quantity, avg_price } = collectionData;

    if (!user_id || !card_id || !quantity) {
        throw new Error('Missing required fields: user id, card id, and quantity are required.');
    }

    try {
        const newCollection = await Collection.create({
            user_id,
            card_id,
            quantity,
            avg_price
        });
        return newCollection;
    } catch (error) {
        console.error('error creating the collection:', error);
        throw new Error('Failed to create the collection.');
    }
}

async function getCollection(userID) {
    if (!userID) {
        throw new Error('Missing required field: userID is required.');
    }

    try {
        const userCollection = await Collection.findAll({
            where: {
                user_id: userID
            }
        });
        return userCollection;
    } catch (error) {
        console.error('Error fetching user collection:', error);
        throw new Error('Failed to fetch user collection.');
    }
}

async function updateCollection(collectionData) {
    const { collection_id, user_id, card_id, quantity, avg_price } = collectionData;

    if (!collection_id || !user_id || !card_id || !quantity) {
        throw new Error('Missing required fields: collection id, user id, card id, and quantity are required.');
    }

    try {
        const result = await Collection.update({
            user_id,
            card_id,
            quantity,
            avg_price
        }, {
            where: { collection_id }
        });
        if (result[0] === 0) { 
            throw new Error('No records found to update.');
        }
        return result;
    } catch (error) {
        console.error('Error updating the collection:', error);
        throw new Error('Failed to update the collection.');
    }
}

module.exports = { createCollection, getCollection, updateCollection };