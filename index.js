const FormData = require('form-data');
const fetch = require('node-fetch');

const auth = require('./services/auth');

const API_URL = 'https://oauth.reddit.com';

module.exports = async (path, method, data, authOptions) => {
  data.api_type = 'json';

  let token = await auth(authOptions);

  switch (method) {
    case 'POST':
      // Post
      let form = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        form.append(key, value.toString());
      });

      await fetch(`${API_URL}${path}`, {
        method: method,
        body: form,
        headers: {
          authorization: `${token.token_type} ${token.access_token}`,
        },
      });
      break;

    default:
      break;
  }

  return;
};
