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
    cardID: 2,
    userID: 1,
  },
  {
    quantity: 1,
    avgPrice: 100.00,
    cardID: 3,
    userID: 2,
  },
  {
    quantity: 1,
    avgPrice: 100.00,
    cardID: 1,
    userID: 2,
  },
  {
    quantity: 1,
    avgPrice: 100.00,
    cardID: 2,
    userID: 3,
  },
  {
    quantity: 1,
    avgPrice: 100.00,
    cardID: 3,
    userID: 3,
  },
  {
    quantity: 1,
    avgPrice: 100.00,
    cardID: 1,
    userID: 4,
  },
  {
    quantity: 1,
    avgPrice: 100.00,
    cardID: 2,
    userID: 4,
  },
];

const seedCollection = () => Collection.bulkCreate(collectionData);

module.exports = seedCollection;