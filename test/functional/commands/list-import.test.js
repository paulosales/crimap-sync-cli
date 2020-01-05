/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha, node */
const chai = require("chai");
const crimeSync = require("../test-utils/crime-sync-runner");
const eraseImports = require("../test-utils/erase-imports");
const importFiles = require("../test-utils/import-files");
const setServiceUrl = require("../test-utils/set-service-url");
const login = require("../test-utils/login");
const logout = require("../test-utils/logout");

describe("[functional] crimesync list-import command", () => {
  context("with a logged user", () => {
    before(async () => {
      await setServiceUrl("http://127.0.0.1:4000/");
      await login();
      await eraseImports();
      await importFiles(15);
    });

    after(async () => {
      await logout();
    });

    context("with no options", () => {
      it("should list the 10 most recents imports.", async () => {
        const ret = await crimeSync(["list-imports"]);
        chai.assert.isNotNull(ret.stdout);
        const lines = ret.stdout.split("\n");
        chai.assert.equal(lines[0], "Top 10 imports");
        chai.assert.equal(lines.length, 14);
      });
    });

    context("with options", () => {
      it("should list the 5 most recents imports.", async () => {
        const ret = await crimeSync(["list-imports", "--top", "5"]);
        chai.assert.isNotNull(ret.stdout);
        const lines = ret.stdout.split("\n");
        chai.assert.equal(lines[0], "Top 5 imports");
        chai.assert.equal(lines.length, 9);
      });

      it("should list all imports.", async () => {
        const ret = await crimeSync(["list-imports", "--all"]);
        chai.assert.isNotNull(ret.stdout);
        const lines = ret.stdout.split("\n");
        chai.assert.equal(lines[0], "Top all imports");
        chai.assert.equal(lines.length, 19);
      });
    });
  });

  context("with a logged user", () => {
    before(async () => {
      await setServiceUrl("http://127.0.0.1:4000/");
      await logout();
    });

    context("with no options", () => {
      it("should fail.", async () => {
        const ret = await crimeSync(["list-imports"]);

        chai.assert.equal(
          ret.stderr,
          "You are not authorized to access this service. You have to login first.\n"
        );
      });
    });
  });
});
