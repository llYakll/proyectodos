const express = require('express');
const session = require('express-session');
const router = express.Router(); //express-session is NOT a part of core express

//import routers
const apiRouter = require('./api/index');
const teamRouter = require('./team');
const homeRouter = require('./home')
const collectionRouter = require('./collection')
                                                    //if session_secret is unavailable
const sessionSecret = process.env.SESSION_SECRET || 'crankin-mahawg-69-420-blazeit-@-urmom-GOBLES';
//session middleware
router.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,//mark this as true 
        maxAge: 24 * 60 * 60 * 1000 //24 hour in ms
    }
}))

//mount api router at base url
router.use('/api', apiRouter);
router.use('/team', teamRouter);
router.use('/', homeRouter);
router.use('/collection', collectionRouter);

module.exports = router;