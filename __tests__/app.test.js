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

  it('should redirect to the github oauth page upon login', async () => {
  // a get request that redirects user to github sign in
    const req = await request(app).get('/api/v1/github/login');
    // but that github sign in is mocked?
    // looks like...
    expect(req.header.location).toMatch(/https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i);
  });

  it('should log the user in with github credentials', async () => {
    // get code from callback url
    // post code + other stuff to https://github.com/login/oauth/access_token
    // get back token
    // use token and send back to GET https://api.github.com/user using Authorization: token OAUTH-TOKEN 
    // get user info from github 
  });

});
