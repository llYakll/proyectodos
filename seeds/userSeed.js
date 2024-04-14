const User = require('../models/user');
const bcrypt = require('bcrypt');

const user_data = [
  {
    username: 'westest',
    password: bcrypt.hashSync('password11', 10)
  },
  {
    username: 'zachtest',
    password: bcrypt.hashSync('password22', 10)
  },
  {
    username: 'robtest',
    password: bcrypt.hashSync('password33', 10)
  },
  {
    username: 'johntest',
    password: bcrypt.hashSync('password44', 10)
  }
];

const seedUser = async () => {
  try {
    await User.bulkCreate(user_data);
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

module.exports = seedUser;