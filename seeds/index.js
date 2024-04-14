const sequelize = require('../config/connection');
const seedUser = require('./userSeed');
const seedCard = require('./cardSeed');
const seedCollection = require('./collectionSeed');
const seedCardCollection = require('./card_collectionSeed');

// Added a bunch of logs for monitoring the seeding process
const seedAll = async () => {
  console.log('Starting database seeding...');

  try {
    await sequelize.sync({ force: true });

    console.log('Database sync successful.');

    console.log('Seeding users...');
    await seedUser();
    console.log('User seeding completed.');

    console.log('Seeding cards...');
    await seedCard();
    console.log('Card seeding completed.');

    console.log('Seeding collections...');
    await seedCollection();
    console.log('Collection seeding completed.');

    console.log('Seeding card collections...');
    await seedCardCollection();
    console.log('Card collection seeding completed.');

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }

  process.exit(0);
};

seedAll();