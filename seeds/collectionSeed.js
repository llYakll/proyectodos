const Collection = require('../models/collection');

const collectionData = [
  {
    quantity: 1,
    avgPrice: 100.00,
    cardID: 1,
    userID: 1,
  },
  {
    quantity: 1,
    avgPrice: 100.00,
    cardID: 1,
    userID: 1,
  },
  {
    quantity: 1,
    avgPrice: 100.00,
    cardID: 1,
    userID: 1,
  },
  {
    quantity: 1,
    avgPrice: 100.00,
    cardID: 1,
    userID: 1,
  },
  {
    quantity: 1,
    avgPrice: 100.00,
    cardID: 1,
    userID: 1,
  },
];

const seedCollection = () => Collection.bulkCreate(collectionData);

module.exports = seedCollection;