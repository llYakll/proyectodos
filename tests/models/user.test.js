const sequelize = require('../../config/connection');
const User = require('../../models/user');

describe('User model', () => {
    // Tests for a successful new user
    it('should create a new user', async () => {
        const userData = {
            username: 'test1user',
            password: 'password1234'
        };
        const user = await User.create(userData);
        expect(user.username).toEqual('test1user');
    });

    // Tests to see the new password was hashed
    it('should hash the password before saving', async () => {
        const userData = {
            username: 'test2user',
            password: 'password1234'
        };
        const user = await User.create(userData);
        expect(user.password).not.toEqual('password1234');
    });

    // Tests so that username will not allow NULL
    it('should not create a user without a username', async () => {
        const userData = {
            password: 'password123'
        };
        let error;
        try {
            await User.create(userData);
        } catch (err) {
            error = err;
        }
        expect(error).toBeDefined();
        expect(error.message).toContain('notNull Violation');
    });

    // Tests to fail for too short of a password
    it('should not create a user with a short password', async () => {
        const userData = {
            username: 'test3user',
            password: 'pass'
        };
        let error;
        try {
            await User.create(userData);
        } catch (err) {
            error = err;
        }
        expect(error).toBeDefined();
        expect(error.message).toContain('Validation error');
    });
});