const User = require('../models/user');
const bcrypt = require('bcrypt');

const user_data = [
  {
    username: 'wes-test',
    password: 'password11',
  },
  {
    username: 'zach-test',
    password: 'password22',
  },
  {
    username: 'rob-test',
    password: 'password33',
  },
  {
    username: 'john-test',
    password: 'password44',
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