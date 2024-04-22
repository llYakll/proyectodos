const User = require('../models/user');
const bcrypt = require('bcrypt')


const userLogin = async (req, res, next) => {
const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' });
        }

        try {
            const user = await User.findOne({ where: { username } });
                if (!user) {
                    return res.status(401).json({ message: 'username or password is incorrect, please try again.' });
                }

            const isMatch = user.checkPassword(password);
                if (!isMatch) {
                    return res.status(401).json({ message: 'username or password is incorrect, please try again.' });
                }

        req.user = user;
        next();
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred while processing your request. Please try again later.' });
    }
};


const logOut = async (req, res) => {
    if (req.session && req.session.loggedIn) {
        req.session.destroy((err) => {
            if (err) {
                console.error("Session destruction error:", err);
                return res.status(500).end();
            }
            
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
};

const createUser = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password  
        });
        return newUser;  
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
};





module.exports = { userLogin, logOut, createUser };