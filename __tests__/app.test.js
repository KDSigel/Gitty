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
    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('should log the user in with github credentials', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=8675309')
      .redirects(1);

    expect(req.body).toEqual({
      id: expect.any(String),
      username: 'mr_cool',
      email: 'karl@karl.com',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('logs out a user', async () => {
    await request.agent(app).get('/api/v1/github/login');
    const req = await request.agent(app).delete('/api/v1/github');
    expect(req.body.message).toEqual('bye bye');
  });

  it('lets a user make a post', async () => {
    await request.agent(app).get('/api/v1/github/login');
    const newPost = await request.agent(app).post('/api/v1/posts').send({ post: 'oooogah' });
    expect(newPost).toEqual({
      id: expect.any(String),
      post: 'oooogah'
    });
  });

  // test for user seeing all posts
});
