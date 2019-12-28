/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha, node */
const assert = require('chai').assert;
const crimeSync = require('../crime-sync-runner');

describe('[functional] crime-sync import command', () => {

	context('with a informed pdf file name', () => {

		it('should start import process.', async () => {
			const ret = await crimeSync(['import', 'teste.pdf']);
			assert.equal(ret.stdout, 'Importing teste.pdf\n');
		});

	});
	
  context('with no pdf file name', () => {

		it('should raise a error.', async () => {
			const ret = await crimeSync(['import']);
			assert.equal(ret.stderr, 'error: missing required argument \'pdf-file\'\n');
		});

	});
});
    


