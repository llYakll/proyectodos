const { userLogin, logOut, createUser } = require('../../utils/userMw');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

jest.mock('../../models/user');

function  mockReq(body) {
    return {
        body,
        user: null
    };
}

function mockRes() {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
}
//--------------------------------login--------------------------------------------------------//
describe('userLogin', () => {
    let req, res, next;

    beforeEach(() => {
        req = mockReq({
            username: 'testuser',
            password: 'correctpassword'
        });
        res = mockRes();
        next = jest.fn();
    });

    it('should validate user with correct credentials', async () => {
        User.findOne.mockResolvedValue({
            user_id: 1,
            username: 'testuser',
            password: 'hashedpassword',
            checkPassword: jest.fn().mockReturnValue(true)
        });

        await userLogin(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it('should fail with invalid credentials', async () => {
        User.findOne.mockResolvedValue({
            user_id: 1,
            username: 'testuser',
            password: 'hashedpassword',
            checkPassword: jest.fn().mockReturnValue(false)
        });

        await userLogin(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'username or password is incorrect, please try again.' });
    });

    it('should return an error if the user does not exist', async () => {
        User.findOne.mockResolvedValue(null);

        await userLogin(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'username or password is incorrect, please try again.' });
    });
});
//----------------------------------logout----------------------------------------------------------------------------//

const sessionMock = {
    loggedIn: true,
    destroy: jest.fn(callback => callback())
};

describe('logOut', () => {
    let req, res;

    beforeEach(() => {
        req = {
            session: sessionMock
        };
        res = {
            status: jest.fn().mockReturnThis(),
            end: jest.fn().mockReturnThis()
        };
    });

    it('should log out a user by destroying the session', async () => {
        await logOut(req, res);

        expect(req.session.destroy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.end).toHaveBeenCalled();
    });

    it('should handle errors during session logout', async () => {
        req.session.destroy = jest.fn(callback => callback(new Error("Session destruction failed")));

        await logOut(req, res);

        // Check error handling
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.end).toHaveBeenCalled();
    });
});
//--------------------------createUser-----------------------------------------------------------------------------//
describe('createUser', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                username: 'newUser',
                password: 'password123'
            }
        };
        res = mockRes();
    });

    it('should create a new user with the provided username and password', async () => {
        User.create.mockResolvedValue({
            user_id: 1,
            username: req.body.username,
            password: req.body.password 
        });

        const newUser = await createUser(req, res);

        expect(User.create).toHaveBeenCalledWith({
            username: req.body.username,
            password: req.body.password 
        });

        expect(newUser).toEqual({
            user_id: 1,
            username: req.body.username,
            password: req.body.password 
        });
    });

    it('should handle errors if user creation fails', async () => {
        const errorMessage = 'An error occurred while creating the user.';
        User.create.mockRejectedValue(new Error(errorMessage));

        await createUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
    });
});