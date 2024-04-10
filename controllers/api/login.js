const express = require('express');
const bcrypt = require('bcrypt')
const router = express.Router();
const db = require('../../db') //import database connection

//signup
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if username or password is missing
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        // Check if the username already exists in the database
        const userExistsQuery = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
        const [userExistsResult] = await db.query(userExistsQuery, [username]);

        if (userExistsResult[0].count > 0) {
            return res.status(400).json({ error: `Username '${username}' already exists. Please choose another username.` });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // salt rounds: 10

        // Insert new user into the database with hashed password
        const insertUser = 'INSERT INTO users (username, password) VALUES (?, ?)';
        await db.query(insertUser, [username, hashedPassword]);

        res.status(201).json({ message: 'Account created!', username });
    } catch (error) {
        console.error('Error creating account:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        // find the user by username
        const getUser = 'SELECT id, username, password FROM users WHERE username = ?';
        const [results] = await db.query(getUser, [username]);

        // Check if user with the given username exists
        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = results[0];

        // compare the provided password with the hashed password from the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Authentication successful, store user ID in session
        req.session.userID = user.id;
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//logout    
router.post('/logout', (req, res) => {
    try {
        // Check if the user is logged in
        if (req.session && req.session.userID) {
            // Log out
            req.session.destroy(err => {
                if (err) {
                    console.error('Error destroying session:', err);
                    return res.status(500).json({ error: 'Failed to logout' });
                }
                // Redirect to the home route after logout
                res.redirect('/');
            });
        } else {
            // User is not logged in
            res.status(401).json({ error: 'User not authenticated' });
        }
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

