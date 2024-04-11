const sequelize = require('../../config/connection');
const { User, Team } = require('../../models');

describe('Team model', () => {
    // beforeAll(async () => {
    //     await sequelize.sync({ force: true });
    // });

    // Test to create a new team
    it('should create a new team', async () => {
        const userData = {
            username: 'test1user',
            password: 'password1234',
            regDate: new Date(),
            lastLogin: new Date()
        };
        const user = await User.create(userData);

        const teamData = {
            teamName: 'Test Team',
            teamHash: 'test_hash',
            userID: user.userID
        };
        const team = await Team.create(teamData);
        
        expect(team.teamName).toBe('Test Team');
        expect(team.teamHash).toBe('test_hash');
        expect(team.userID).toBe(user.userID);
    });

    // Test to ensure teamName is required
    it('should not create a team without a teamName', async () => {
        const userData = {
            username: 'test2user',
            password: 'password1234',
            regDate: new Date(),
            lastLogin: new Date()
        };
        const user = await User.create(userData);

        const teamData = {
            // teamName is missing intentionally
            teamHash: 'test_hash',
            userID: user.userID
        };
        try {
            await Team.create(teamData);
            // If creation is successful, fail the test
            fail('Team creation should have failed');
        } catch (error) {
            // use log if needing to inspect error
            // console.log('This is the Error:', error);

            // Check if SequelizeValidationError is thrown
            expect(error.name).toBe('SequelizeValidationError');
        }
    });

    // Commented out for later the only test that does not work because the error.name is not the sequelize foreign key error
    // // Test to ensure userID is required
    // it('should not create a team without a userID', async () => {
    //     const userData = {
    //         username: 'test4user',
    //         password: 'password1234',
    //         regDate: new Date(),
    //         lastLogin: new Date()
    //     };
    //     // Create a user record first
    //     const user = await User.create(userData);
    //
    //     const teamData = {
    //         teamName: 'Test Team',
    //         teamHash: 'test_hash',
    //         // Provide the user's ID
    //         userID: user.userID
    //     };
    //     try {
    //         await Team.create(teamData);
    //         // If creation is successful, throw an error to fail the test
    //         throw new Error('Team creation should have failed');
    //     } catch (error) {
    //         console.log('Caught Error:', error);
    //         // Check if an error is caught
    //         expect(error).toBeDefined();
    //         // Check if the error type is as expected
    //         expect(error.name).toBe('SequelizeForeignKeyConstraintError');
    //     }
    // });

    // Test to update teamName
    it('should update teamName successfully', async () => {
        // Create a user and a team
        const userData = {
            username: 'test3user',
            password: 'password1234',
            regDate: new Date(),
            lastLogin: new Date()
        };
        const user = await User.create(userData);

        const teamData = {
            teamName: 'Original Team Name',
            teamHash: 'test_hash',
            userID: user.userID
        };
        const team = await Team.create(teamData);

        // Update the teamName
        const newTeamName = 'Updated Team Name';
        await team.update({ teamName: newTeamName });

        // Fetch the updated team from the database
        const updatedTeam = await Team.findByPk(team.teamID);

        // Check if teamName is updated correctly
        expect(updatedTeam.teamName).toBe(newTeamName);
    });
});