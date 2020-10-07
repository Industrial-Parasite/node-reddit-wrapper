# node-reddit-wrapper

<!-- [![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url] -->
![CI](https://github.com/Industrial-Parasite/node-reddit-wrapper/workflows/CI/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple node wrapper used by [Industrial Parasite](https://industrialparasite.com) to post new releases to it's subreddit.

## Installation
---
npm:

```sh
npm install node-reddit-wrapper --save
```

yarn:

```sh
yarn add node-reddit-wrapper
```

## Feature
---
- Wrap Reddit's API
- Use native promise and async functions.
- Functional design

## Usage
---
1. [Create reddit app](https://www.reddit.com/prefs/apps).  
   a) Click `create app` located at the bottom of the link above.  
   b) Add app info; selecting `script` as the type and adding any url for `about url` and `redirect uri`
2. Create a credentials `object`.

```json
const credentials = {
    "appId":  "YOUR_APP_ID",
    "appSecret": "YOUR_APP_SECRET",
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD"
}
```

3. Make a post to your subreddit.

```js
await reddit(
  '/api/submit', // Reddit API PATH
  'POST', // Method (currently only supports POST)
  {
    flair_id: 'bd2aa23a-4159-11ea-8d7e-0ed477f315f3',
    kind: 'link',
    resubmit: true,
    title: 'Ae/Sthetic - Polaris',
    sr: 'IndustrialParasite',
    url: 'https://industrialparasite.ffm.to/ae-sthetic-polaris',
  },
  credentials // The credentials object we created in step 2.
);
```

## To Do
---
- Improve response handling
- Add Get
- Add Put
- Add Delete

## Meta
---
[Industrial Parasite](https://industrialparasite.com) – [@IndustrialPara](https://twitter.com/IndustrialPara)

Distributed under the MIT license. See `LICENSE` for more information.

[https://github.com/Industrial-Parasite/node-reddit-wrapper](https://github.com/Industrial-Parasite/node-reddit-wrapper)

## Contributing
---
1. Fork it
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'feat: THE FEATURE'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request