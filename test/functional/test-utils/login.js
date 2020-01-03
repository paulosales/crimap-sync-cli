/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const crimeSync = require('./crime-sync-runner');
const { config } = require('../../../src/config');

module.exports = async () => {
  const authData = await crimeSync(['login', 'johndoe', 'abc']);

  await config.set('authToken', authData.token);
  await config.save();
}
