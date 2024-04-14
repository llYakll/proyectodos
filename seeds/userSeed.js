const User = require('../models/user');
const bcrypt = require('bcrypt');

const user_data = [
  {
    username: 'wes-test',
    password: bcrypt.hashSync('password11', 10)
  },
  {
    username: 'zach-test',
    password: bcrypt.hashSync('password22', 10)
  },
  {
    username: 'rob-test',
    password: bcrypt.hashSync('password33', 10)
  },
  {
    username: 'john-test',
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