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

describe('Card model', () => {
  // Test case for saving a card to a collection
  it('should save a card to a user\'s collection', async () => {
    // Mock user data
    const userData = { id: 1, username: 'testuser' };

    // Mock card data
    const cardData = {
      cardID: 1,
      cardType: 'Basic',
      imgURL: 'https://example.com/pikachu.png',
      pokeID: 25
    };

    // Mock collection data
    const collectionData = { collectionID: 1, userId: userData.id };

    // Mock user authentication
    User.findOne.mockResolvedValue(userData);

    // Mock finding user's collection
    Collection.findOne.mockResolvedValue(collectionData);

    // Mock saving card to collection
    Card_Collection.create.mockResolvedValue({});

    // Call the function to save the card to the user's collection
    const result = await Card.saveToCollection(cardData, userData.id);

    expect(result).toBeDefined();
  });
});