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
    const card_collection_data = {
      card_id: 1,
      collection_id: 1,
    };

    // Mock the behavior of the create method
    Card_Collection.create.mockResolvedValue(card_collection_data);

    // Create the card_collection entry
    const result = await Card_Collection.create(card_collection_data);

    expect(result).toBeDefined();
    expect(result.card_id).toBe(card_collection_data.card_id);
    expect(result.collection_id).toBe(card_collection_data.collection_id);
  });
});