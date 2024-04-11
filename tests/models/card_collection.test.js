// Import necessary modules and dependencies
const { sequelize, DataTypes } = require('../../config/connection'); // Import sequelize instance and DataTypes
const Card_Collection = require('../../models/card_collection'); // Import the Card_Collection model

// Mock the create method of Card_Collection model
jest.mock('../../models/card_collection', () => ({
  create: jest.fn(),
}));

describe('Card_Collection model', () => {
  // Test case for creating a card_collection entry
  it('should create a card_collection entry linking a card to a collection', async () => {
    // Mock card_collection data
    const cardCollectionData = {
      cardID: 1,
      collectionID: 1,
    };

    // Mock the behavior of the create method
    Card_Collection.create.mockResolvedValue(cardCollectionData);

    // Call the function to create the card_collection entry
    const result = await Card_Collection.create(cardCollectionData);

    // Assertions
    expect(result).toBeDefined();
    expect(result.cardID).toBe(cardCollectionData.cardID);
    expect(result.collectionID).toBe(cardCollectionData.collectionID);
  });
});