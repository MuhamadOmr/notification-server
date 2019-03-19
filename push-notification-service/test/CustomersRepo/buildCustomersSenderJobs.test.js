const chai = require('chai');
const path = require('path');
require('dotenv').config({path: path.resolve(`./.${process.env.NODE_ENV}.env`)});
const { buildCustomersSenderJobs } = require('../../src/helpers/CustomersRepo');
const Customer = require('../../src/models/customer');

chai.should();
describe('get list of sender jobs personalized notification', () => {
  before(async () => {
    await Customer.deleteMany({});
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
        'should return list of 2 objects that have devices tokens and a message when condition have country egypt',
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
