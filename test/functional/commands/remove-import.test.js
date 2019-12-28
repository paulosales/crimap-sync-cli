/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha */
const assert = require('chai').assert;
const crimeSync = require('../crime-sync-runner');

describe('[functional] crimesync remove-import command', () => {
  
  context('with no parameter', () => {
    it('should raise a error', async () => {
      const ret = await crimeSync(['remove-import']);
      assert.equal(ret.stderr, 'error: missing required argument \'import-hash\'\n');
    });
  });

  context('with hash parameter', () => {
    it('should remove the import', async () => {
      const ret = await crimeSync(['remove-import', '1234567890']);
      assert.equal(ret.stdout, 'Removing the import 1234567890\n');
    });
  });

});