/* eslint-disable no-console */
const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getGithubProfile = async (token) => {
  console.log(`MOCK INVOKED: getGithubProfile(${token})`);
  return {
    username: 'mr_cool',
    email: 'karl@karl.com'
  };
};

module.exports = { exchangeCodeForToken, getGithubProfile };
