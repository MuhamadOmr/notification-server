const chai = require('chai');
require('dotenv').config();
const { buildCustomersSenderJobs } = require('../../src/helpers/CustomersRepo');
const Customer = require('../../src/models/customer');

chai.should();
describe('Get List Of Devices Tokens Test', () => {
  before(async () => {
    await Customer.remove({});
    await Customer.insertMany([
      {
        name: 'Muhammad',
        country: 'egypt',
        deviceToken: 'c8LVSED6z2s',
        language: 'arabic',
        carrier: 'vodafone',
      },
      {
        name: 'Omar',
        country: 'egypt',
        deviceToken: 'c8LVSED6z2s',
        language: 'arabic',
        carrier: 'vodafone',
      },
    ]);
  });
  [
    {
      caseName:
        'should return list of 2 objects each contain devices tokens of of 1 length and a message when condition have country egypt',
      condition: {
        carriers: ['vodafone'],
        countries: ['egypt'],
      },
      message: 'hey {name} from {country} welcome',
    },
  ].forEach(testCase => {
    it(testCase.caseName, async () => {
      const senderJobs = await buildCustomersSenderJobs(
        testCase.message,
        testCase.condition,
      );
      senderJobs.should.be.a('array');
      senderJobs.should.to.have.deep.members([
        {
          devicesTokens: ['c8LVSED6z2s'],
          message: 'hey Muhammad from egypt welcome',
        },
        {
          devicesTokens: ['c8LVSED6z2s'],
          message: 'hey Omar from egypt welcome',
        },
      ]);
    });
  });
});
