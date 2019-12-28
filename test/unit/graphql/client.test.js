/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha */

const sinon = require('sinon');
const readline = require('readline-sync');
const chai = require('chai');
const proxyquire = require('proxyquire');
const { config } = require('../../../src/config')

describe('[unit] create graphql client', () => {
  const SERVICE_URL = 'http://locahost:4000/';
  const WRONG_SERVICE_URL = 'wrong:url.no.sense';
  let sandbox;
  
  beforeEach(()=> {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('with no config setted.', () => {
    context('with user setting the right url', () => {
      it('should request the service url from user and persist it.', async () => {
        const getConfigStub = sandbox.stub(config, "get");
        const questionStub = sandbox.stub(readline, "question");
        const checkServiceUrlStub = sandbox.stub();
        const setConfigSpy = sandbox.spy(config, "set");
        const saveConfigStub = sandbox.stub(config, "save");
        const writeStdOutStub = sandbox.stub(process.stdout, "write");

        getConfigStub.returns(Promise.resolve(undefined));
        questionStub.returns(SERVICE_URL);
        checkServiceUrlStub.returns(Promise.resolve(true));
  
        const createClient = proxyquire('../../../src/graphql/client', {
          '../helpers/check-service-url': checkServiceUrlStub
        });
  
        const client = await createClient();
  
        chai.expect(client).to.be.not.undefined;
        chai.expect(client).to.be.not.null;
        chai.expect(setConfigSpy.calledWith('serviceUrl', SERVICE_URL)).to.be.true;
        chai.expect(saveConfigStub.calledOnce).to.be.true;
        chai.expect(writeStdOutStub.calledWith(`Service url ${SERVICE_URL} saved.`));
      });
    });

    context('with user setting a wrong url at first time and fixing at the second time', () => {
      it('should send a message to user fix the url and at the second moment it should persist the correct url.', async () => {
        const getConfigStub = sandbox.stub(config, "get");
        const questionStub = sandbox.stub(readline, "question");
        const checkServiceUrlStub = sandbox.stub();
        const saveConfigStub = sandbox.stub(config, "save");
        const writeStdOutStub = sandbox.stub(process.stdout, "write");

        getConfigStub.returns(Promise.resolve(undefined));
        questionStub
          .onFirstCall().returns(WRONG_SERVICE_URL)
          .returns(SERVICE_URL);
        checkServiceUrlStub
          .onFirstCall().returns(Promise.resolve(false))
          .returns(Promise.resolve(true));

        const createClient = proxyquire('../../../src/graphql/client', {
          '../helpers/check-service-url': checkServiceUrlStub
        });

        const client = await createClient();
        
        chai.expect(client).to.be.not.undefined;
        chai.expect(client).to.be.not.null;
        
        chai.expect(
          writeStdOutStub
            .firstCall
            .calledWith(`The service URL ${WRONG_SERVICE_URL} is not valid or the service is not available.\n`)
        ).to.be.true;

        chai.expect(
          writeStdOutStub
            .secondCall
            .calledWith(`Try again or type CTRL + C to cancel.\n`)
        ).to.be.true;

        chai.expect(
          writeStdOutStub
            .thirdCall
            .calledWith(`Service url ${SERVICE_URL} saved.\n`)
        ).to.be.true;

        chai.expect(saveConfigStub.calledOnce).to.be.true;
      });
    })
  });

  context('with the service url setted.', () => {
    it('should get the service url and create a client', async () => {
      const getConfigStub = sandbox.stub(config, "get");
      const checkServiceUrlStub = sandbox.stub();
      const setConfigSpy = sandbox.spy(config, "set");
      const saveConfigStub = sandbox.stub(config, "save");
      const writeStdOutStub = sandbox.stub(process.stdout, "write");

      getConfigStub.returns(Promise.resolve(SERVICE_URL));

      const createClient = proxyquire('../../../src/graphql/client', {
        '../helpers/check-service-url': checkServiceUrlStub
      });

      const client = await createClient();

      chai.expect(client).to.be.not.undefined;
      chai.expect(client).to.be.not.null;

      chai.expect(saveConfigStub.notCalled).to.be.true;
      chai.expect(setConfigSpy.notCalled).to.be.true;
      chai.expect(writeStdOutStub.notCalled).to.be.true;
    });
  })
});
