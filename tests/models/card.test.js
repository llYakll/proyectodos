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
    const userData = { id: 1, username: 'testuser' };

    // Test card data
    const cardData = {
      cardID: 1,
      setID: 'xy1-1',
      cardName: 'Venusaur-EX',
      cardType: ['Basic', 'EX'],
      imgURL: 'https://example.com/pikachu.png'
    };

    // Mock collection data
    const collectionData = { collectionID: 1, userId: userData.id };

    // Mock user authentication
    User.findOne.mockResolvedValue(userData);

    // Mock finding user's collection
    Collection.findOne.mockResolvedValue(collectionData);

    // Mock saving card to collection
    Card_Collection.create.mockResolvedValue({});

    // Save the card to the user's collection
    const result = await Card.saveToCollection(cardData, userData.id);

    expect(result).toBeDefined();

    // Verify that Card_Collection.create was called with the correct parameters
    expect(Card_Collection.create).toHaveBeenCalledWith({
      cardID: cardData.cardID,
      collectionID: collectionData.collectionID,
    });
  });
});