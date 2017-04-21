const assert = require('assert');
const request = require('supertest');
const app = require('../app.js');

describe('Users Controller', () => {
  it('Post to /api/users creates a new user', (done) => {
    request(app)
      .post('/api/users')
      .send({ email: 'test@test.com' })
      .end((err, response) => {
        done()
      });
  });
});