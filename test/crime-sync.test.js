/* eslint-env node, mocha */
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const assert = require('chai').assert;

function crimeSync (args = [], cwd = '..') {
  return new Promise((resolve, reject) => {
    try {
      exec(`node ${path.resolve('crime-sync.js')} ${args.join(' ')}`, { cwd }, (error, stdout, stderr) => {
        resolve({ error, stdout, stderr })
      })
    }
    catch(e) {
      reject(e);
    }
  })
}

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

  it('should return the help text', async () => {
    const ret = await crimeSync();
    assert.equal(ret.stdout, helpText);
  });

});
