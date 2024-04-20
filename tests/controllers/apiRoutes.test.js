const request = require('supertest');
const express = require('express');
const TCGRoutes = require('../../controllers/api/tcg-routes'); 


jest.mock('../../utils/tcg-helper', () => ({
    isValidPokemon: (req, res, next) => { req.pokemonData = 'Sample Pokemon Data'; next(); },
    constructUrl: (req, res, next) => { req.largeImageUrl = 'http://example.com/pokemon.jpg'; next(); },
    fetchPokemonData: (req, res, next) => { next(); }
}));

const app = express();
app.use(express.json());
app.use('/', TCGRoutes);

describe('GET /fetch', () => {
    it('should return Pokemon data and a card image URL', async () => {
        const response = await request(app)
            .get('/fetch')
            .query({ pokeInput: 'pikachu' }); 

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            pokemonData: 'Sample Pokemon Data',
            cardImage: 'http://example.com/pokemon.jpg'
        });
    });
});