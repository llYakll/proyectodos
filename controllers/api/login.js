const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    // Placeholder: Save user to database (replace with actual database logic)
    res.status(201).json({ message: 'Account created!', username });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // (replace with actual authentication logic)
    /*
     if (username === 'valid_username' || password === 'valid_password') {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    */

    // Placeholder: auth success (generate token, set session, etc.)
    res.json({ message: 'Login successful!' });
});

router.post('/logout', (req, res) => {
    // implement user logout logic 
    res.json({ message: 'Logout successful!' });
});

router.use((err, req, res, next) => {
    console.error(err);

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Invalid JSON payload' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = router;

/*

If the error err is a SyntaxError (related to JSON parsing),
AND if the error has a status of 400 (Bad Request),
AND if the error object has a 'body' property,
Then, the middleware assumes that the error is due to an invalid JSON payload in the request body

*/