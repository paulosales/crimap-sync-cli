/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const crimeSync = require('./crime-sync-runner');

module.exports = async () => {
  //erase imports collection data.
  const ret = await crimeSync(['list-imports']);
  const lines = ret.stdout.split('\n');

  lines.shift();
  lines.shift();
  lines.shift();
  lines.pop();

  for(let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const columns = line.split(' ');
    await crimeSync(['remove-import', columns[0]]);
  }
};
