const request = require('supertest');
const app = require('../../server');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

describe('User routes', () => {
  describe('POST /api/users/login', () => {
    it('should log in a user with valid credentials', async () => {
      // Create a user in the database
      const userData = {
        username: 'testuser5',
        password: 'password5',
      };
      const user = await User.create(userData);

      // Send a login request with valid credentials
      const res = await request(app)
        .post('/api/users/login')
        // .send(userData);
        .send({
          username: 'testuser5',
          password: 'password5',
        });

      // Assert that the response indicates successful login
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toEqual('You are now logged in!');
    });

    it('should return an error with invalid credentials', async () => {
      // Send a login request with invalid credentials
      const res = await request(app)
        .post('/api/users/login')
        .send({
          username: 'invaliduser',
          password: 'invalidpassword',
        });

      // Assert that the response indicates invalid credentials
      expect(res.statusCode).toEqual(400);
      // expect(res.body.message).toEqual('User not found. Please check your username and try again.');
      expect(res.body.message).toEqual('Incorrect username or password. Please try again!');
    });

    it('should return an error if username or password is missing', async () => {
        // Send a login request with missing username
        let res = await request(app)
            .post('/api/users/login')
            .send({
                password: 'password1234',
            });
      
        // Assert that the response indicates missing username
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Username and password are required.');
      
        // Send a login request with missing password
        res = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser5',
            });
      
        // Assert that the response indicates missing password
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Username and password are required.');
    });

    it('should return an error if user is not found', async () => {
        // Send a login request with username of non-existent user
        const res = await request(app)
            .post('/api/users/login')
            .send({
                username: 'nonexistentuser',
                password: 'password5',
        });
    
        // Assert that the response indicates user not found
        expect(res.statusCode).toEqual(400);
        // expect(res.body.message).toEqual('User not found. Please check your username and try again.');
        expect(res.body.message).toEqual('Incorrect username or password. Please try again!');
    });

    it('should return an error if password is incorrect', async () => {
        // Send a login request with incorrect password
        const res = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser5',
                password: 'incorrectpassword',
        });
    
        // Assert that the response indicates incorrect password
        expect(res.statusCode).toEqual(400);
        // expect(res.body.message).toEqual('Incorrect password. Please try again.');
        expect(res.body.message).toEqual('Incorrect username or password. Please try again!');
    });
    
    it('should log out a user', async () => {
        // Log in a user
        const loginReq = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser5',
                password: 'password5',
            });
        
        // Extract the session cookie
        const cookie = loginReq.headers['set-cookie'][0];
        
        // Log out the user using the session cookie
        const logoutReq = await request(app)
            .post('/api/users/logout')
            .set('Cookie', cookie);
        
        // Assert that the response indicates successful logout
        expect(logoutReq.statusCode).toEqual(204);
    });
  });
});