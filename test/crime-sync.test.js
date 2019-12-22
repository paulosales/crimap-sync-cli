/* eslint-env node, mocha */
const path = require('path');
const fs = require('fs');
const assert = require('chai').assert;
const crimeSync = require('./helpers/crime-sync-runner');

describe('crime-sync', () => {
  let helpText;

  before(async () => {
    fs.readFile(
      path.dirname(__filename) + '/help.txt',
      'utf8',
      (err, data)=>{
        if(err) {
          throw err;
        }
        helpText = data;
      }
    )
  })

  context('with no parameters', () => {
    
    it('should return the help text', async () => {
      const ret = await crimeSync();
      assert.equal(ret.stdout, helpText);
    });

  });

});
