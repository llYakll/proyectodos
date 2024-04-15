const Collection = require('../models/collection');

const collection_data = [
  {
    quantity: 1,
    avg_price: 12.56,
    card_id: 1,
    user_id: 1,
  },
  {
    quantity: 1,
    avg_price: 19.30,
    card_id: 2,
    user_id: 1,
  },
  {
    quantity: 1,
    avg_price: 13.62,
    card_id: 3,
    user_id: 1,
  },
  {
    quantity: 1,
    avg_price: 4.15,
    card_id: 4,
    user_id: 1,
  },
  {
    quantity: 1,
    avg_price: 4.15,
    card_id: 4,
    user_id: 2,
  },
  {
    quantity: 1,
    avg_price: 13.62,
    card_id: 3,
    user_id: 2,
  },
  {
    quantity: 1,
    avg_price: 19.30,
    card_id: 2,
    user_id: 2,
  },
  {
    quantity: 1,
    avg_price: 12.56,
    card_id: 1,
    user_id: 3,
  },
  {
    quantity: 1,
    avg_price: 13.62,
    card_id: 3,
    user_id: 3,
  },
  {
    quantity: 1,
    avg_price: 4.15,
    card_id: 4,
    user_id: 4,
  },
];

const seedCollection = async () => {
  try {
      await Collection.bulkCreate(collection_data);
  } catch (error) {
      console.error('Error seeding collections:', error);
  }
};

module.exports = seedCollection;