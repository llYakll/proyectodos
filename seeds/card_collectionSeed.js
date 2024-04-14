const Card_Collection = require('../models/card_collection');

const card_collection_data = [
  {
    card_id: 1,
    collection_id: 1,
  },
  {
    card_id: 2,
    collection_id: 1,
  },
  {
    card_id: 3,
    collection_id: 1,
  },
  {
    card_id: 4,
    collection_id: 1,
  },
  {
    card_id: 4,
    collection_id: 2,
  },
  {
    card_id: 3,
    collection_id: 2,
  },
  {
    card_id: 2,
    collection_id: 2,
  },
  {
    card_id: 1,
    collection_id: 3,
  },
  {
    card_id: 3,
    collection_id: 3,
  },
  {
    card_id: 4,
    collection_id: 4,
  },
];

const seedCardCollection = async () => {
  try {
    await Card_Collection.bulkCreate(card_collection_data);
  } catch (error) {
    console.error('Error seeding card collections:', error);
  }
};

module.exports = seedCardCollection;