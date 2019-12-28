/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha, node */
const assert = require('chai').assert;
const crimeSync = require('../crime-sync-runner');

describe('[functional] crimesync list-import command', () => {

  context('with no options', () => {
    it('should list the 10 most recents imports.', async () => {
      const ret = await crimeSync(['list-imports']);
      assert.equal(ret.stdout, 'Listing imports...\nundefined\n10\n');
    });
  });

  context('with options', () => {
    it('should list the 20 most recents imports.', async () => {
      const ret = await crimeSync(['list-imports', '--top', '20']);
      assert.equal(ret.stdout, 'Listing imports...\nundefined\n20\n');
    });

    it('should list all imports.', async () => {
      const ret = await crimeSync(['list-imports', '--all']);
      assert.equal(ret.stdout, 'Listing imports...\ntrue\n10\n');
    });
  });

});
