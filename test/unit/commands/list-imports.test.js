/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-env mocha */
const sinon = require('sinon');
const chai = require('chai');
const proxyquire = require('proxyquire');

describe('[unit] list-imports', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  context('with top 10 option setted', () => {
    
    it('should return the top 10 imports', async () => {
      const opts = { top: 10 };
      const listImportResult = {
        data: {
          listImports: [
            {
              id: 'a243b3a44fa243b3a44f3a55',
              startDate: '2019-12-29T16:15:01.338Z',
              finishDate: null,
              author: { username: 'testeuser'},
              status: 'RUNNING',
            },
            {
              id: 'f243b5a44fa2c3b5a43f3a56',
              startDate: '2019-12-30T15:10:06.018Z',
              finishDate: '2019-12-30T15:13:06.031Z',
              author: { username: 'testeuser'},
              status: 'SUCCESS',
            }
          ]
        }
      };
      const queryStub = sandbox.stub().returns(listImportResult);
      const getClientStub = sandbox.stub().returns({query: queryStub});
      const stdOutWriteStub = sandbox.stub(process.stdout, 'write');

      const listImportCommand = proxyquire(
        '../../../src/commands/list-imports',
        {
          '../graphql/client': getClientStub
        }
      );

      await listImportCommand(opts);

      chai.expect(stdOutWriteStub.getCall(0).calledWith('Top 10 imports\n')).to.be.true;
      chai.expect(stdOutWriteStub.getCall(1).calledWith('---------------------------------------------------------------------------------------------\n')).to.be.true;
      chai.expect(stdOutWriteStub.getCall(2).calledWith('ID                       start date               finish date              status  author\n')).to.be.true;
      chai.expect(stdOutWriteStub.getCall(3).calledWith('a243b3a44fa243b3a44f3a55 2019-12-29T16:15:01.338Z                          RUNNING testeuser\n')).to.be.true;
      chai.expect(stdOutWriteStub.getCall(4).calledWith('f243b5a44fa2c3b5a43f3a56 2019-12-30T15:10:06.018Z 2019-12-30T15:13:06.031Z SUCCESS testeuser\n')).to.be.true;
    });
  });
});
