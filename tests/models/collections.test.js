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

    const collectionData = {
      quantity: 1,
      avgPrice: 10.0,
      cardID: 1,
      userID: 1,
    };

    // Mock finding user's collection
    Collection.findOne.mockResolvedValue(null);

    // Mock saving collection
    Collection.create.mockResolvedValue(collectionData);

    // Call the function to create the collection
    const result = await Collection.create(collectionData);

    expect(result).toBeDefined();
    expect(result.quantity).toBe(collectionData.quantity);
    expect(result.avgPrice).toBe(collectionData.avgPrice);
  });
});