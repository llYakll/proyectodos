const express = require('express');
const { createUser, userLogin, logOut } = require('../../utils/userMw')
const userRoutes = express.Router();

userRoutes.post('/', async (req, res) => { //i cant find the correct end point???
    try {
        const newUser = await createUser(req, res);
        res.status(201).json({ user: newUser, message: 'User created successfully!' });
		res.redirect('/');
		} catch (error) {
			console.error('Registration error:', error);
		}
});

userRoutes.post('/login', userLogin, (req, res) => {
    res.status(200).json({ message: 'You are now logged in!', user: req.user });
	res.redirect('/');
});

userRoutes.post('/logout', logOut, (req, res) => {
    res.status(204).end();
	res.redirect('/');
});


module.exports = userRoutes;