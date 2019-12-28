/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env node, mocha */
const path = require('path');
const fs = require('fs');
const assert = require('chai').assert;
const crimeSync = require('./crime-sync-runner');

describe('[functional] crime-sync', () => {
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
