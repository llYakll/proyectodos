const User = require('../models/user');
const bcrypt = require('bcrypt');

const userData = [
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

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;