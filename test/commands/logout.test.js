/* eslint-env mocha */
const assert = require('chai').assert;
const crimeSync = require('../helpers/crime-sync-runner');

describe('crimesync logout command', () => {
  
  it('should logout', async () => {

    const ret = await crimeSync(['logout']);
    assert.equal(ret.stdout, 'Logging-out...\n');

  });

});