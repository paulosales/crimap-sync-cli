/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const exec = require('child_process').exec;
const path = require('path');
const debug = require('debug').debug('crimemap-sync-cli');

module.exports = function crimeSync (args = [], cwd = '..') {
  return new Promise((resolve, reject) => {
    try {
      debug('Spawing the process node crime-sync.js.');
      const childProcess = exec(
        `node ${path.resolve('crime-sync.js')} ${args.join(' ')}`,
        { cwd },
        (error, stdout, stderr) => {
          const res = { error, stdout, stderr };
          debug(`Child process ${childProcess.pid} finished with result {error: ${error}, stdout: ${stdout}, stderr: ${stderr}}.`);
          resolve(res);
        }
      );
      debug(`child process ${childProcess.pid} spawed.`);
    }
    catch(e) {
      reject(e);
    }
  })
}
  