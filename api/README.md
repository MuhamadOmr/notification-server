# PushBots API v3

[![CircleCI](https://circleci.com/gh/pushbots/pushbots-api-v3.png?style=png)](https://circleci.com/gh/pushbots/pushbots-api-v3)

## Packages
* [glue](https://github.com/hapijs/glue)
* [config](https://github.com/lorenwest/node-config)
* [mongoose](https://github.com/Automattic/mongoose)
* [crumb](https://github.com/hapijs/crumb)
* [vision](https://github.com/hapijs/vision)
* [nunjucks](https://mozilla.github.io/nunjucks)

## Usage
```no-highlight
yarn install
yarn start

yarn lint
yarn lint:fix

yarn test
yarn test-cov-html

yarn pm2:dev
yarn pm2:prod

yarn pm2:watch
yarn pm2:stop

yarn pm2:logs
```


## Production

Create `config/production.json` file after using `NODE_ENV=production`

## Creating new endpoint

1. Open `config/manifest.js` and add  plugin for new prefixed route

```no-highlight
{
 plugin: './app/routes/push',
 routes: {
   prefix: '/3/push'
 }
}
```


2. Create {endpoint_root}.js controller in app/controllers:

```javascript
/**
 * Project: pushbots-api-v3
 */
//const mongoose = require('mongoose');
//const User = mongoose.model('users');

// handlers are exported back for use in hapi routes
const Handlers = {};

// Lib contains our business specific logic
const Lib = {};

//Sample function for unit testing
Lib.getIds = async id => {
  return ['id1', 'id2'];
};

Handlers.get = async (req, res) => {
  var json = {
    path: 'home2',
  };
  return json;
};

module.exports = {
  handlers: Handlers,
  lib: Lib,
  // Main route
  // => /
  view: {
    description: 'API Home',
    handler: Handlers.get,
  },
};
```

2. Create {endpoint_root}.js route in app/routes:

```javascript
/** 
 * Project: pushbots-api-v3
 */
 
exports.plugin = {
  async register(server) {
    const Controller = require('../controllers/endpoint_root');
    server.route([
      {
        method: 'GET',
        path: '/',
        options: Controller.view
      }
    ]);
  },
  version: require('../../package.json').version,
  name: 'main-route'
};
```
