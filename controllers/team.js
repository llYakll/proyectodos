const express = require('express');
const router = express.Router();
const db = require('../db/schema.sql');

// generate a unique hash for team identification
function generateHash() {
    return Math.random().toString(36).substring(2, 10); //generate random string
}

// save a team (with Pokémon to the database
router.post('/save', async (req, res) => { //(path, callback)
    try {
        const { userID, teamName, teamMembers } = req.body;

        // insert a new team into the team table
        const createTeam = `
            INSERT INTO team (userID, teamName, teamHash)
            VALUES (?, ?, ?)
        `;
        const teamHash = generateHash();
        const userTeam = await db.query(createTeam, [userID, teamName, teamHash]);
        const teamID = userTeam.insertId;

        // insert team members into the team_roster table
        const addTeamMembers = `
            INSERT INTO team_roster (teamID, pokeID)
            VALUES (?, ?)
        `;
        for (const pokeID of teamMembers) {
            await db.query(addTeamMembers, [teamID, pokeID]);
        }

        res.json({ message: 'Team saved successfully' });
    } catch (error) {
        console.error('Error saving team:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
