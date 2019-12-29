/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha, node */
const assert = require('chai').assert;
const crimeSync = require('../test-utils/crime-sync-runner');
const eraseImports = require('../test-utils/erase-imports');

describe('[functional] crime-sync import command', () => {

	before(eraseImports);

	context('with a informed pdf file url', () => {

		it('should start import process.', async () => {
			const ret = await crimeSync(['import', 'http://domain.com/teste.pdf']);
			assert.equal(ret.stderr, '', 'shouldn\'t have error. Maybe there are some imports.');
			const lines = ret.stdout.split('\n');
			assert.equal(lines[0], 'File \'teste.pdf\' imported.');
		});

	});

	context('with a pdf file url already imported', () => {

		it('should start import process.', async () => {
			const inserted = await crimeSync(['import', 'http://domain.com/teste2.pdf']);
			assert.notEqual(inserted.stdout, '', 'the import stdout should have a output text.');
			
			const matches = /Generated ID: ([0-9abcdef]{24})/gm.exec(inserted.stdout);
			const insertedId = matches[1];

			const ret = await crimeSync(['import', 'http://domain.com/teste2.pdf']);

			assert.isNotNull(ret.stderr);
			assert.equal(ret.stderr, `The file http://domain.com/teste2.pdf is already imported with the ID '${insertedId}'.\n`);			
		});

	});
	
  context('with no pdf file url', () => {
		it('should raise a error.', async () => {
			const ret = await crimeSync(['import']);
			assert.equal(ret.stderr, "error: missing required argument 'pdf-url'\n");
		});

	});
});
