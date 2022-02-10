const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

const fakeUser = {
  email: 'broken@arrow.com',
  password: 'Nucflash'
};

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Users can sign up using their Github account', () => {
  // a get request that redirects user to github sign in
  // gets back code to user for request to user info?
  // 
  });




});
