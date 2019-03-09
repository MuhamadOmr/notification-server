/**
 * Project: notification-api
 */
const config = require('config');
const Config = JSON.parse(JSON.stringify(config));
const Inert = require('inert');
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const swaggerOptions = {
  host: 'localhost:3000',
  pathPrefixSize: 2,
  sortTags: 'default',
  sortEndpoints: 'ordered',
  tags: [
    {
      name: 'push',
      description:
        'Endpoints related to sending different types of push notifications.',
    },
  ],
  info: {
    title: 'SWVL notification API Documentation',
    version: '1.0.0',
    description: 'notification api for internal usage',
    contact: {
      name: 'Muhamad Omar',
      email: 'mohamed.ahmed.c209@gmail.com',
    },
  },
};

const plugins = [
  {
    plugin: './lib/mongoose',
    options: {
      uri: Config.mongo,
    },
  },
  {
    plugin: Inert,
  },
  {
    plugin: Vision,
  },
  {
    plugin: HapiSwagger,
    options: swaggerOptions,
  },
  {
    plugin: './components/main/routes',
  },
  {
    plugin: './components/push/routes',
    routes: {
      prefix: '/push',
    },
  },
];
exports.manifest = {
  server: {
    router: {
      stripTrailingSlash: true,
      isCaseSensitive: false,
    },
    routes: {
      security: {
        hsts: false,
        xss: true,
        noOpen: true,
        noSniff: true,
        xframe: false,
      },
      cors: false,

      jsonp: 'callback', // <3 Hapi,
      auth: false, // remove this to enable authentication or set your authentication profile ie. auth: 'jwt'
    },
    debug: Config.debug,
    port: Config.port,
  },
  register: {
    plugins,
  },
};
