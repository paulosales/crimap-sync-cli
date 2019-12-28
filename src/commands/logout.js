/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const { config } = require('../../src/config');

module.exports = async () => {
  await config.set('authToken', undefined);
  await config.save();
  process.stdout.write('You are logged out.\n');
};
