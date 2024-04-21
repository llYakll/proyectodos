const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const searchRoutes = require('./searchRoutes');
const collectionRoutes = require('./collectionRoutes');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/search', searchRoutes);
router.use('/collection', collectionRoutes);
router.use('/api', apiRoutes);

module.exports = router;