const request = require('supertest');
const express = require('express');
const userRoutes = require('../../controllers/api/userRoutes'); 


jest.mock('../../utils/userMw', () => ({
    createUser: jest.fn((req, res) => res.status(201).send({ user: 'newUser', message: 'User created successfully!' })),
    userLogin: jest.fn((req, res, next) => { req.user = { name: 'testUser' }; next(); }),
    logOut: jest.fn((req, res, next) => { next(); })
}));

const app = express();
app.use(express.json());
app.use('/', userRoutes);

describe('POST /register', () => {
  it('should create a new user and return 201 status', async () => {
      const response = await request(app)
          .post('/register')
          .send({ username: 'newuser', password: 'password123' });

      expect(response.statusCode).toBe(201);
      expect(response.body.user).toBe('newUser');
      expect(response.body.message).toBe('User created successfully!');
  });
});

describe('POST /login', () => {
  it('should log in the user and return 200 status', async () => {
      const response = await request(app)
          .post('/login')
          .send({ username: 'testUser', password: 'password123' });

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('You are now logged in!');
      expect(response.body.user).toBeDefined();
  });
});

describe('POST /logout', () => {
  it('should log out the user and return 204 status', async () => {
      const response = await request(app).post('/logout');

      expect(response.statusCode).toBe(204);
  });
});