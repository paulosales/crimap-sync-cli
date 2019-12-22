/* eslint-env mocha */
const assert = require('chai').assert;
const crimeSync = require('../helpers/crime-sync-runner');

describe('crimesync login command', () => {
  
  it('should login', async () => {

    const ret = await crimeSync(['login']);
    assert.equal(ret.stdout, 'Logging-in...\n');

  });

});