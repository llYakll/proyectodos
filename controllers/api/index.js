const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const TCGRoutes = require('./tcg-routes');


router.use('/search', TCGRoutes);
router.use('/users', userRoutes);


module.exports = apiRoutes;