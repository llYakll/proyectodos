const sequelize = require('../config/connection');
const seedUser = require('./userSeed');
const seedCard = require('./cardSeed');
const seedCollection = require('./collectionSeed');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedCard();

  await seedCollection();

  process.exit(0);
};

seedAll();