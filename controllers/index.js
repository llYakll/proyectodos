const express = require('express');
const session = require('express-session');
const router = express.Router(); //express-session is NOT a part of core express

//import routers
const apiRouter = require('./api/index');
const teamRouter = require('./team');
const homeRouter = require('./home')
const collectionRouter = require('./collection')
                                                    
//mount api router at base url
router.use('/api', apiRouter);
router.use('/team', teamRouter);
router.use('/', homeRouter);
router.use('/collection', collectionRouter);

module.exports = router;