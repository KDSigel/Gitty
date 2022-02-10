const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('Users can sign up using their Github account', async () => {
  // a get request that redirects user to github sign in
    const req = await request(app).get('/api/v1/github/login');
    // but that github sign in is mocked?
    // looks like...
    expect(req.header.location).toMatch(/https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i);
  });

});
