const router = require('express').Router();
const collectionRoutes = require('./collection')
const homeRoutes = require('./homeRoutes');
const searchRoutes = require('./searchRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/search', searchRoutes);
router.use('/api', apiRoutes);
router.use('/collection', collectionRoutes)

module.exports = router;