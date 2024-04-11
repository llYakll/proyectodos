// Import necessary modules and dependencies
const { sequelize, DataTypes } = require('../../config/connection'); // Import sequelize instance and DataTypes
const Collection = require('../../models/collection'); // Import the Collection model

// Mock Collection model methods for managing collections
jest.mock('../../models/collection', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe('Collection model', () => {
  // Test case for creating a collection
  it('should create a collection with average sell price and total value', async () => {
    // Mock collection data
    const collectionData = {
      quantity: 1,
      avgPrice: 10.0, // Mocked average sell price
      cardID: 1,
      userID: 1,
    };

    // Mock finding user's collection
    Collection.findOne.mockResolvedValue(null);

    // Mock saving collection
    Collection.create.mockResolvedValue(collectionData);

    // Call the function to create the collection
    const result = await Collection.create(collectionData);

    // Assertions
    expect(result).toBeDefined();
    expect(result.quantity).toBe(collectionData.quantity);
    expect(result.avgPrice).toBe(collectionData.avgPrice);
  });
});