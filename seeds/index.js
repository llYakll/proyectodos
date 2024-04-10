const sequelize = require('../config/connection');
const seedPokemonTable = require('./pokemonSeed');

const seedAll = async () => {

  await seedPokemonTable();

  process.exit(0);
};

seedAll();