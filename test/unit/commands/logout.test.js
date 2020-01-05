/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha */

const sinon = require("sinon");
const chai = require("chai");
const { config } = require("../../../src/config");
const logoutCommand = require("../../../src/commands/logout");

describe("[unit] crimesync logout command", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should logged out", () => {
    const setConfigStub = sandbox.stub(config, "set");
    const saveConfigStub = sandbox.stub(config, "save");
    const writeStub = sandbox.stub(process.stdout, "write");

    logoutCommand();

    chai.expect(setConfigStub.calledWith("authToken", undefined));
    chai.expect(saveConfigStub.calledOnce);
    chai.expect(writeStub.calledWith("You are logged out.\n"));
  });
});
