/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha */

const chai = require("chai");
const sinon = require("sinon");
const fs = require("fs");
const path = require("path");
const proxyquire = require("proxyquire");

describe("[unit] configuration persistence", () => {
  const CONFIG_FILE = path.resolve(
    process.env.HOME,
    ".crime-sync",
    "config.json"
  );
  let sandbox;

  beforeEach(done => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach(done => {
    sandbox.restore();
    done();
  });

  describe("get the configuration", () => {
    context("without a config directory", () => {
      it("should create the config directory and returns a config with undefined value", async () => {
        const fsExistsSyncStub = sandbox.stub(fs, "existsSync");
        const mkdirSyncStub = sandbox.stub(fs, "mkdirSync");
        fsExistsSyncStub.returns(false);

        const config = proxyquire("../../../src/config/config", {
          fs: {
            existsSync: fsExistsSyncStub,
            mkdirSync: mkdirSyncStub
          }
        });

        const res = await config.get("someAttribute");

        chai.expect(res).to.be.undefined;
        chai.expect(mkdirSyncStub.calledOnce).to.be.true;
      });
    });

    context("with a config directory and without config file.", () => {
      it("should return undefined", async () => {
        const fsExistsSyncStub = sandbox.stub(fs, "existsSync");
        const mkdirSyncStub = sandbox.stub(fs, "mkdirSync");
        fsExistsSyncStub.withArgs(CONFIG_FILE).returns(false);
        fsExistsSyncStub.returns(true);

        const config = proxyquire("../../../src/config/config", {
          fs: {
            existsSync: fsExistsSyncStub,
            mkdirSync: mkdirSyncStub
          }
        });

        const res = await config.get("someAttribute");

        chai.expect(mkdirSyncStub.notCalled).to.be.true;
        chai.expect(res).to.be.undefined;
      });
    });

    context("with the config directory and with the config file", () => {
      it("should return the config value stored in the file.", async () => {
        const fsExistsSyncStub = sandbox.stub(fs, "existsSync");
        const mkdirSyncStub = sandbox.stub(fs, "mkdirSync");
        const readFileSyncFake = sandbox.fake.returns(
          '{ "someAttribute": "config-value" }'
        );

        fsExistsSyncStub.returns(true);

        const config = proxyquire("../../../src/config/config", {
          fs: {
            existsSync: fsExistsSyncStub,
            mkdirSync: mkdirSyncStub,
            readFileSync: readFileSyncFake
          }
        });

        const res = await config.get("someAttribute");
        chai.expect(mkdirSyncStub.notCalled).to.be.true;
        chai.expect(res).to.be.equal("config-value");
      });
    });
  });

  describe("save the configuration", () => {
    context("with no config set", () => {
      it("should save a empty JSON object", async () => {
        const writeFileSyncStub = sandbox.stub(fs, "writeFileSync");

        const config = proxyquire("../../../src/config/config", {
          fs: {
            writeFileSync: writeFileSyncStub
          }
        });

        await config.save();

        chai.expect(writeFileSyncStub.calledOnce).to.be.true;
        chai.expect(writeFileSyncStub.calledWith(CONFIG_FILE, "{}")).to.be.true;
      });
    });

    context("with config set", () => {
      it("should save a JSON object", async () => {
        const writeFileSyncStub = sandbox.stub(fs, "writeFileSync");
        const readFileSyncFake = sandbox.fake.returns("{}");

        const config = proxyquire("../../../src/config/config", {
          fs: {
            writeFileSync: writeFileSyncStub,
            readFileSync: readFileSyncFake
          }
        });

        config.set("someAttribute", "attrValue");
        await config.save();
        chai.expect(writeFileSyncStub.calledOnce).to.be.true;
        const savedJson = `{
  "someAttribute": "attrValue"
}`;
        chai.expect(writeFileSyncStub.calledWith(CONFIG_FILE, savedJson)).to.be
          .true;
      });
    });
  });
});
