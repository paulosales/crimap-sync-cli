/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha */
const assert = require("chai").assert;
const crimeSync = require("../test-utils/crime-sync-runner");

describe("[functional] crimesync login command", () => {
  context("with no username and password", () => {
    it("should fail", async () => {
      const ret = await crimeSync(["login"]);
      assert.equal(ret.stderr, "error: missing required argument 'username'\n");
    });
  });

  context("with username and no password", () => {
    it("should fail", async () => {
      const ret = await crimeSync(["login", "user"]);
      assert.equal(ret.stderr, "error: missing required argument 'password'\n");
    });
  });
});
