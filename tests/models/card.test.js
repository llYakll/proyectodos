const { sequelize, DataTypes } = require('../../config/connection');
const Card = require('../../models/card');
const User = require('../../models/user');
const Collection = require('../../models/collection');
const Card_Collection = require('../../models/card_collection');

// Mock User model methods for authentication
jest.mock('../../models/user', () => ({
  findOne: jest.fn(),
}));

// Mock Collection model methods for managing collections
jest.mock('../../models/collection', () => ({
  findOne: jest.fn(),
}));

// Mock Card_Collection model methods for managing card collections
jest.mock('../../models/card_collection', () => ({
  create: jest.fn(),
}));

// Test case for saving a card to a collection
describe('Card model', () => {
  it('should save a card to a user\'s collection', async () => {
    // Test user data
    const user_data = { id: 1, username: 'testuser' };

    // Test card data
    const card_data = {
      card_id: 1,
      set_id: 'xy1-1',
      card_name: 'Venusaur-EX',
      card_subtypes: ['Basic', 'EX'],
      average_sell_price: 6.3,
      img_url: 'https://images.pokemontcg.io/xy1/1_hires.png'
    };

    // Mock collection data
    const collection_data = { collection_id: 1, user_id: user_data.id };

    // Mock user authentication
    User.findOne.mockResolvedValue(user_data);

    // Mock finding user's collection
    Collection.findOne.mockResolvedValue(collection_data);

    // Mock saving card to collection
    Card_Collection.create.mockResolvedValue({});

    // Save the card to the user's collection
    const result = await Card.saveToCollection(card_data, user_data.id);

    expect(result).toBeDefined();

    // Verify that Card_Collection.create was called with the correct parameters
    expect(Card_Collection.create).toHaveBeenCalledWith({
      card_id: card_data.card_id,
      collection_id: collection_data.collection_id,
    });
  });
});