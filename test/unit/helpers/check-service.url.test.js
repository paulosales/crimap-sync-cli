/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha */

const sinon = require("sinon");
const chai = require("chai");
const { ApolloClient } = require("apollo-client");
const checkServiceUrl = require("../../../src/helpers/check-service-url");

describe("check service url", () => {
  let sandbox;

  beforeEach(done => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach(done => {
    sandbox.restore();
    done();
  });

  context("with a invalid service url", () => {
    it("should return false", async () => {
      const valid = await checkServiceUrl("invalidurl");

      chai.expect(valid).to.be.false;
    });
  });

  context("with a valid and wrong service url", () => {
    it("should return false", async () => {
      const valid = await checkServiceUrl("http://www.google.com.br");
      chai.expect(valid).to.be.false;
    });
  });

  context("with a valid and right service url", () => {
    it("should return true", async () => {
      const clientQueryStub = sandbox.stub(ApolloClient.prototype, "query");
      clientQueryStub.returns(
        Promise.resolve({
          data: {
            info: {
              name: "crimemap-sync-api"
            }
          }
        })
      );

      const valid = await checkServiceUrl("http://localhost:4000/");
      chai.expect(valid).to.be.true;
    });
  });
});
