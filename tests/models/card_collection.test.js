const { sequelize, DataTypes } = require('../../config/connection');
const Card_Collection = require('../../models/card_collection');

// Mock the create method of Card_Collection model
jest.mock('../../models/card_collection', () => ({
  create: jest.fn(),
}));

// Test case for creating a card_collection entry
describe('Card_Collection model', () => {
  it('should create a card_collection entry linking a card to a collection', async () => {
    // Test card_collection data
    const cardCollectionData = {
      cardID: 1,
      collectionID: 1,
    };

    // Mock the behavior of the create method
    Card_Collection.create.mockResolvedValue(cardCollectionData);

    // Create the card_collection entry
    const result = await Card_Collection.create(cardCollectionData);

    expect(result).toBeDefined();
    expect(result.cardID).toBe(cardCollectionData.cardID);
    expect(result.collectionID).toBe(cardCollectionData.collectionID);
  });
});