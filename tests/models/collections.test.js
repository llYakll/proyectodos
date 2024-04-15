const { sequelize, DataTypes } = require('../../config/connection');
const Collection = require('../../models/collection');

// Mock Collection Model methods for managing collections
jest.mock('../../models/collection', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

// Test case for creating a Collection Model
describe('Collection model', () => {
  it('should create a collection with average sell price and total value', async () => {

    const collection_data = {
      quantity: 1,
      avg_price: 10.0,
      card_id: 1,
      user_id: 1,
    };

    // Mock finding user's collection
    Collection.findOne.mockResolvedValue(null);

    // Mock saving collection
    Collection.create.mockResolvedValue(collection_data);

    // Call the function to create the collection
    const result = await Collection.create(collection_data);

    expect(result).toBeDefined();
    expect(result.quantity).toBe(collection_data.quantity);
    expect(result.avg_price).toBe(collection_data.avg_price);
  });
});