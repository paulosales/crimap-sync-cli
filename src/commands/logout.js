/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require('debug').debug('crimemap-sync-cli');

const { config } = require('../../src/config');

module.exports = async () => {
  debug('Loging out');
  debug('Removing authToken.');
  await config.set('authToken', undefined);
  await config.save();
  debug('Token removed.');
  process.stdout.write('You are logged out.\n');
};
