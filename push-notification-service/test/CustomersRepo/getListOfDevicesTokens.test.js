const chai = require('chai');
require('dotenv').config();
const { getListOfdevicesTokens } = require('../../src/helpers/CustomersRepo');
const Customer = require('../../src/models/customer');

chai.should();
describe('Get List Of Devices Tokens Test', () => {
  before(async () => {
    await Customer.remove({});
    await Customer.insertMany([
      {
        name: 'Muhammad',
        country: 'egypt',
        deviceToken:
          'c8LVSED6z2s:APA91bFWAwM3xEQbiu1iQ_TGyFyumFx9h7jZJ35nwBkCga1X_xd7REZinIAjdEWVKIlrJHutdpwv6s8iHgyPFQvFXQYFlMZDanpStLRonH9lhGv0DioCHP1WZR3oYwC7IyCSHIklOnK-',
        language: 'arabic',
        carrier: 'vodafone',
      },
      {
        name: 'Omar',
        country: 'egypt',
        deviceToken:
          'c8LVSED6z2s:APA91bFWAwM3xEQbiu1iQ_TGyFyumFx9h7jZJ35nwBkCga1X_xd7REZinIAjdEWVKIlrJHutdpwv6s8iHgyPFQvFXQYFlMZDanpStLRonH9lhGv0DioCHP1WZR3oYwC7IyCSHIklOnK-',
        language: 'arabic',
        carrier: 'vodafone',
      },
    ]);
  });
  [
    {
      caseName:
        'should return list of 2 tokens when condition have country egypt',
      condition: {
        carriers: ['vodafone'],
        countries: ['egypt'],
      },
    },
  ].forEach(testCase => {
    it(testCase.caseName, async () => {
      const tokens = await getListOfdevicesTokens(testCase.condition);
      tokens.length.should.be.equal(2);
      tokens.should.be.a('array');
    });
  });
});
