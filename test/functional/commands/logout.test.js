/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha */
const assert = require("chai").assert;
const crimeSync = require("../test-utils/crime-sync-runner");

describe("[functional] crimesync logout command", () => {
  it("should logout", async () => {
    const ret = await crimeSync(["logout"]);
    assert.equal(ret.stdout, "You are logged out.\n");
  });
});
