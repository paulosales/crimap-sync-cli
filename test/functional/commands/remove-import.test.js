/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha */
const assert = require("chai").assert;
const crimeSync = require("../test-utils/crime-sync-runner");
const eraseImports = require("../test-utils/erase-imports");
const setServiceUrl = require("../test-utils/set-service-url");
const login = require("../test-utils/login");
const logout = require("../test-utils/logout");

describe("[functional] crimesync remove-import command", () => {
  before(async () => {
    await setServiceUrl("http://127.0.0.1:4000/");
    await login();
    await eraseImports();
  });

  after(async () => {
    await logout();
  });

  context("remove with no parameter", () => {
    it("should raise a error", async () => {
      const ret = await crimeSync(["remove-import"]);
      assert.equal(ret.stderr, "error: missing required argument 'ID'\n");
    });
  });

  context("remove with a invalid ID", () => {
    it("should raise a error", async () => {
      const ret = await crimeSync(["remove-import", "1234567890"]);
      assert.equal(ret.stderr, "The id '1234567890' is invalid.\n");
    });
  });

  context("remove with a no-existent ID", () => {
    it("should raise a error", async () => {
      const ret = await crimeSync([
        "remove-import",
        "123456789012345678901234"
      ]);
      assert.equal(
        ret.stderr,
        "Import '123456789012345678901234' not found.\n"
      );
    });
  });

  context("remove a existent import", () => {
    it("should remove the import successfuly", async () => {
      const inserted = await crimeSync([
        "import",
        "http://domain.com/test-file.pdf"
      ]);

      assert.notEqual(
        inserted.stdout,
        "",
        "the stdout should have a content. may be the test-file.pdf is already imported."
      );
      assert.equal(inserted.stderr, "", "the stderr shouldn't have a connect.");

      const matches = /Generated ID: ([0-9abcdef]{24})/gm.exec(inserted.stdout);
      const insertedId = matches[1];
      const removed = await crimeSync(["remove-import", insertedId]);

      assert.equal(removed.stdout, `Import '${insertedId}' removed.\n`);
    });
  });
});
