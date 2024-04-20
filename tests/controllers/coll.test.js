const { createCollection, getCollection, updateCollection } = require('../../utils/collections');

jest.mock('../../models/collection', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn()
  }));

const Collection = require('../../models/collection');

describe('Collection functions', () => {
    beforeEach(() => {
       
        Collection.create.mockReset();
        Collection.findAll.mockReset();
        Collection.update.mockReset();
    });

    describe('createCollection', () => {
        it('should create a new collection and return it', async () => {
            const mockCollectionData = {
                user_id: 1,
                card_id: 2,
                quantity: 5,
                avg_price: 100.00
            };
            Collection.create.mockResolvedValue(mockCollectionData);

            const result = await createCollection(mockCollectionData);
            expect(Collection.create).toHaveBeenCalledWith(mockCollectionData);
            expect(result).toEqual(mockCollectionData);
        });

        it('should throw an error when required fields are missing', async () => {
            const incompleteData = { card_id: 2, quantity: 5 };
            await expect(createCollection(incompleteData)).rejects.toThrow('Missing required fields: user id, card id, and quantity are required.');
        });
    });

    describe('getCollection', () => {
        it('should fetch user collection from the database', async () => {
            const mockUserCollection = [
                { id: 1, user_id: 1, card_id: 1, quantity: 3 },
                { id: 2, user_id: 1, card_id: 2, quantity: 5 }
            ];
            Collection.findAll.mockResolvedValue(mockUserCollection);
    
            const result = await getCollection(1);  
            expect(Collection.findAll).toHaveBeenCalledWith({ where: { user_id: 1 } });
            expect(result).toEqual(mockUserCollection);
        });
    
        it('should throw an error if userID is missing', async () => {
            await expect(getCollection()).rejects.toThrow('Missing required field: userID is required.');
        });
    });

    describe('updateCollection', () => {
        it('should update a collection and return the result', async () => {
            const mockUpdateData = {
                collection_id: 1,
                user_id: 1,
                card_id: 2,
                quantity: 10,
                avg_price: 150.00
            };
            Collection.update.mockResolvedValue([1]);  

            const result = await updateCollection(mockUpdateData);
            expect(Collection.update).toHaveBeenCalledWith({
                user_id: 1,
                card_id: 2,
                quantity: 10,
                avg_price: 150.00
            }, {
                where: { collection_id: 1 }
            });
            expect(result).toEqual([1]);
        });

        it('should throw an error when required fields are missing', async () => {
            const incompleteData = { user_id: 1, card_id: 2, quantity: 10 };
            await expect(updateCollection(incompleteData)).rejects.toThrow('Missing required fields: collection id, user id, card id, and quantity are required.');
        });
    });
});