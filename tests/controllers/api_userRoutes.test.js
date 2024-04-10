const request = require('supertest');
const app = require('../../server');
const User = require('../../models/user');
const bcrypt = require('bcrypt');

describe('User routes', () => {
  describe('POST /api/users/login', () => {
    it('should log in a user with valid credentials', async () => {
      // Create a user in the database
      const currentDate = new Date();
      const hashedPassword = await bcrypt.hash('password1234', 10);
      const user = await User.create({
        username: 'testuser',
        password: hashedPassword,
        regDate: currentDate,
        lastLogin: currentDate,
      });

      // Send a login request with valid credentials
      const res = await request(app)
        .post('/api/users/login')
        .send({
          username: 'test1user',
          password: 'password1234',
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
      expect(res.body.message).toEqual('Incorrect username or password. Please try again!');
    });
    
    it('should log out a user', async () => {
        // Log in a user
        const loginReq = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'password1234',
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