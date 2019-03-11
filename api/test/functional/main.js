'use strict';

// requires for testing
const Code = require('code');
const expect = Code.expect;
const Lab = require('lab');
const lab = (exports.lab = Lab.script());

// use some BDD verbage instead of lab default
const describe = lab.describe;
const it = lab.it;
const after = lab.after;

// require hapi server
const Server = require('../../server.js');

describe('functional tests - main', () => {
  it('should get main page', async () => {
    // make API call to self to test functionality end-to-end
    const server = await Server.deployment();
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).to.equal(200);
  });

  after(async () => {
    // placeholder to do something post tests
  });
});
