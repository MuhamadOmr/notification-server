// requires for testing
const Code = require('code');
const Lab = require('lab');

const { expect } = Code;
const { after, describe, it } = (exports.lab = Lab.script());

// require hapi server
const Server = require('../../server.js');

describe('functional tests - main', () => {
  it('should get main response', { timeout: 4000 }, async () => {
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
