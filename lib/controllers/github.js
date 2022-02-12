const { Router } = require('express');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');
const GithubUser = require('../models/GithubUser');
const { exchangeCodeForToken, getGithubProfile } = require('../utils/github');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`
    );
  })
  // another get route here for logging in user?
  .get('/login/callback', async (req, res) => {
    // get code back from github
    const code = req.query.code;
    const token = await exchangeCodeForToken(code);
    const { username, email } = await getGithubProfile(token);
    let user = await GithubUser.findByUsername(username);
    if (!user) {
      user = await GithubUser.insert({ username, email });
    }

    const jsonWebToken = jwt.sign({ ...user }, process.env.JWT_SECRET, {
      expiresIn: '1 day',
    });

    res
      .cookie(process.env.COOKIE_NAME, jsonWebToken, {
        httpOnly: true,
        maxAge: 123456789,
      })
      .redirect('/api/v1/github/dashboard');
  })
  .get('/dashboard', authenticate, async (req, res) => {
    res.json(req.user);
  });

// .delete to sign a use out
