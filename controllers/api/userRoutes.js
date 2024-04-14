const router = require('express').Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');

// Route for retrieving all users for testing
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for creating a new user
router.post('/', async (req, res) => {
	try {
		const dbUserData = await User.create({
			username: req.body.username,
			password: req.body.password,
		});

		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.userId = dbUserData.user_id;

			res.status(200).json(dbUserData);
		});
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// Route for logging in
router.post('/login', async (req, res) => {
	try {
		// Check if username and password are provided
		if (!req.body.username || !req.body.password) {
			console.log('no username or password');
			return res.status(400).json({ message: 'Username and password are required.' });
		}
		
		const dbUserData = await User.findOne({
			where: {
				username: req.body.username,
			},
		});
	
		if (!dbUserData) {
			return res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
		}

		console.log('this is the req.body.password:', req.body.password);
		console.log('this is the dbUserData.password:', dbUserData.password);

		const validPassword = await bcrypt.compare(req.body.password, dbUserData.password);

		console.log('this is the validPassword:', validPassword);
	
		if (!validPassword) {
			return res.status(400).json({ message: 'Incorrect username or password. Please try again!' });
		}

		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.userId = dbUserData.user_id;
	
			res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'An error occurred while processing your request. Please try again later.' });
	}
});

// Route for logging out
router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
			req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;