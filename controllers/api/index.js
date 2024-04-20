const express = require('express');
const router = express.Router();

// import routers
const TCGRouter = require('./TCG');
const userRoutes = require('./userRoutes');

// mount routers onto the parent router
router.use('/search', TCGRouter);
router.use('/users', userRoutes);


module.exports = Router;