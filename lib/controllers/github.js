const { Router } = require('express');

module.exports = Router()
  .get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}&scope=user&redirect_uri=${process.env.GH_REDIRECT_URI}`);
  })
// another get route here for logging in user?
  .get('/login/callback', async (req, res) => {
    // get code back from github
    const code = req.query.code;


    // const token = await fetch('https://github.com/login/oauth/access_token', 
    // send method, headers, body with client_id & client_secret & code
    //  )
    // get back token
    // get access_token off of token

    // use access_token and const rawProfile = await fetch('https://api.github.com/user', 
    // method, header using Authorization: token OAUTH-TOKEN
    // )

    // get profile off of rawProfile.json()

    // get username and email from profile

    // sets a cookie for the user? session?

    // send the user to the dashboard
  });

// .get route for dashboard that return the user info

// .delete
