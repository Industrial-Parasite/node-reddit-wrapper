const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

const TOKEN_DIR =
  (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) +
  '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'node-reddit-wrapper.json';
const TOKEN_URL = 'https://www.reddit.com/api/v1/access_token';

const getToken = async () => {
  //Check for token
  if (!fs.existsSync(TOKEN_PATH)) return null;

  //Return Token
  let token = fs.readFileSync(TOKEN_PATH);
  return JSON.parse(token);
};

const getNewToken = async (options) => {
  let form = new FormData();
  form.append('grant_type', 'password');
  form.append('username', options.username);
  form.append('password', options.password);

  const token = await fetch(TOKEN_URL, {
    method: 'POST',
    body: form,
    headers: {
      authorization: `Basic ${Buffer.from(
        `${options.appId}:${options.appSecret}`
      ).toString('base64')}`,
    },
  }).then((res) => res.json());

  if (!token || token.error)
    Promise.reject(
      new Error(
        'Issue generating token. Most likely due to incorrect credentials.'
      )
    );

  await storeToken(token);
  return token;
};

const storeToken = async (token) => {
  if (!fs.existsSync(TOKEN_DIR)) fs.mkdirSync(TOKEN_DIR);

  fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));

  return;
};

module.exports = async (options) => {
  if (!options.appId)
    return Promise.reject(new Error('appId is missing from options.'));
  if (!options.appSecret)
    return Promise.reject(new Error('appSecret is missing from options.'));
  if (!options.username)
    return Promise.reject(new Error('username is missing from options.'));
  if (!options.password)
    return Promise.reject(new Error('password is missing from options.'));

  // Get Auth
  let token = await getToken();

  if (!token || token.expires_in * 1000 < Date.now())
    token = await getNewToken(options).catch((error) =>
      console.log(('Error generating token: ', error.message))
    );

  return token;
};
