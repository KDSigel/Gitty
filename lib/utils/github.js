const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const token = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.GH_CLIENT_ID,
      client_secret: process.env.GH_CLIENT_SECRET,
      code,
    }),
  });

  const jsontoken = await token.json();
  return jsontoken.access_token;
};

const getGithubProfile = async (access_token) => {
  const rawProfile = await fetch('https://api.github.com/user', {
    method: 'GET',
    headers: {
      Authorization: `token ${access_token}`,
    },
  });
  const profile = await rawProfile.json();
  return profile;
};

module.exports = { exchangeCodeForToken, getGithubProfile };
