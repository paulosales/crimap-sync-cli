#!/usr/bin/env node

/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const commandParser = require("./src/command-parser");

commandParser(process.argv);
