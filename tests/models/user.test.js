const { sequelize } = require('../index');
const User = require('../user');

describe('User model', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    it('should create a new user', async () => {
        const userData = {
            username: 'testuser',
            password: 'password123',
            regDate: new Date(),
            lastLogin: new Date()
        };
        const user = await User.create(userData);
        expect(user.username).toEqual('testuser');
    });

    it('should hash the password before saving', async () => {
        const userData = {
            username: 'testuser2',
            password: 'password123',
            regDate: new Date(),
            lastLogin: new Date()
        };
        const user = await User.create(userData);
        expect(user.password).not.toEqual('password123');
    });

    it('should not create a user without a username', async () => {
        const userData = {
            password: 'password123',
            regDate: new Date(),
            lastLogin: new Date()
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

    it('should not create a user with a short password', async () => {
        const userData = {
            username: 'testuser3',
            password: 'pass',
            regDate: new Date(),
            lastLogin: new Date()
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