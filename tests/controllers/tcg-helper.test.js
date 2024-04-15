const { isValidPokemon, constructUrl, fetchPokemonData } = require('../../utils/tcg-helper');

//---------------isValidPokemon----------------------------

describe('isValidPokemon', () => {
    it('should throw an error for invalid Pokemon names containing non-letter characters', () => {
      expect(() => isValidPokemon('invalid123')).toThrowError('Please only use uppercase and lowercase characters and try again.');
    });
  
    it('should throw an error for empty input', () => {
      expect(() => isValidPokemon('')).toThrowError('Please provide a valid Pokemon name.');
    });
  
  });

  //--------------------constructUrl-----------------------------

  describe('constructUrl', () => {
    it('constructs the correct URL', () => {
        const pokemonName = 'pikachu';
        const expectedUrl = 'https://api.pokemontcg.io/v2/cards?q=name:pikachu*';

        const actualUrl = constructUrl(pokemonName);

        expect(actualUrl).toEqual(expectedUrl);
    });
});

//-------------------------fetchPokemonData-------------------------
describe('fetchPokemonData', () => {
    it('fetches Pokémon data successfully', async () => {
        const pokemonName = 'Pikachu';

        const pokemonData = await fetchPokemonData(pokemonName);

        expect(pokemonData).toBeDefined();
        expect(pokemonData.data[0]).toHaveProperty('id');
        expect(pokemonData.data[0]).toHaveProperty('name');
        expect(pokemonData.data[0]).toHaveProperty('subtypes');
        expect(pokemonData.data[0].cardmarket.prices).toHaveProperty('averageSellPrice');
    }, 10000);
});

//---------------------user selection?-----------


//--------------------------------------------------------
describe('saveToCollection', () => {
    it('saves the users selected pokemon to the database', async () => {
      

    })
})

