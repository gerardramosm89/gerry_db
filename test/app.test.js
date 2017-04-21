const assert = require('assert');
const request = require('supertest');
const app = require('../app.js');
describe('The express app', () => {
  it('handles a GET request to /api', (done) => {
    request(app)
      .get('/api')
      .end((err, response) => {
        console.log(response.body.message);
        done();
      });
  });
});