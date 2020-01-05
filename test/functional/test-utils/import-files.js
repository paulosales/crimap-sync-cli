/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const crimeSync = require("./crime-sync-runner");

module.exports = async qty => {
  for (let i = 1; i <= qty; i++) {
    await crimeSync(["import", `http://domain.com/test-file_${i}.pdf`]);
  }
};
