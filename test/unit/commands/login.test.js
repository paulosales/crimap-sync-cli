/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha */
const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { config } = require('../../../src/config');

describe('[unit] crimesync login command', () => {
  let sandbox;

  beforeEach((done)=>{
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  context('with a invalid username and password', () => {
    it('should fail', async () => {
      const loginResult = {
        data: {
          login: {
            success: false,
            message: 'Username or password is invalid!',
          }
        }
      };
      const mutateStub = sandbox.stub().returns(loginResult);
      const createClientStub = sandbox.stub().returns({mutate: mutateStub});
    
      const loginCommand = proxyquire(
        '../../../src/commands/login', 
        {
          "../graphql/client": createClientStub
        }
      );

      const stdErrWriteStub = sandbox.stub(process.stderr, "write");

      await loginCommand('user', 'wrong');

      chai.assert.isTrue( stdErrWriteStub.calledOnce );
      chai.assert.isTrue( stdErrWriteStub.calledWith('Username or password is invalid!\n') );
    });
  });

  context('with a valid username and password', () => {
    it('should login and save the token.', async () => {
      const loginResult = {
        data: {
          login: {
            success: true,
            token: 'secret auth token returned',
          }
        }
      };
      const mutateStub = sandbox.stub().returns(loginResult);
      const createClientStub = sandbox.stub().returns({mutate: mutateStub});
      const setConfigSpy = sandbox.spy(config, 'set');
      const saveConfigStub = sandbox.stub(config, 'save');
    
      const loginCommand = proxyquire(
        '../../../src/commands/login', 
        {
          "../graphql/client": createClientStub
        }
      );

      const stdOutWriteStub = sandbox.stub(process.stdout, "write");

      await loginCommand('user', 'right');

      chai.assert.isTrue( stdOutWriteStub.calledOnce );
      chai.assert.isTrue( stdOutWriteStub.calledWith('You are logged in.\n') );
      chai.assert.isTrue( setConfigSpy.calledOnce );
      chai.assert.isTrue( saveConfigStub.calledOnce );
    });
  });
});
