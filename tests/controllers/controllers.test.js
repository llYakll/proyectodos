const { getCards } = require('../../utils/helpers');

describe('getCards', () => {
    it('should construct the correct API URL with name', async () => {
        const req = { query: { name: 'Pikachu' } };

        let pokemonCard; // variable to capture the response from api
        
        const res = {
            json: (data) => {
                pokemonCard = data; // Capture the response data
            }
        };


        // Call the getCards function with mocked `req`, `res`, and `next` arguments
        await getCards(req, res);

        // Validate that pokemonCard contains the expected data
        expect(pokemonCard).toBeDefined(); // Ensure data is defined
        expect(Array.isArray(pokemonCard.cards)).toBe(true); // Ensure cards array is present
        expect(pokemonCard.cards.length).toBeGreaterThan(0); // Ensure there are cards

        // Validate specific properties of the first card
        const firstCard = pokemonCard.cards[0];
        expect(firstCard.name).toBe('Pikachu'); // Ensure the first card's name is 'Pikachu'
    });
});


// =(