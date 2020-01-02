/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require('debug').debug('crimemap-sync-cli');
const gql = require('graphql-tag');
const getClient = require('../graphql/client');

const LIST_IMPORTS = gql`
  query ListImports($top: Int = 0) {
    listImports(top: $top) {
      id startDate finishDate status
      author {
        username firstName lastName
      }
      file {
        name hash
      }
    }
  }
`;

module.exports = async (cmd) => {
  debug('listing imports');
  const client = await getClient();
  const top = cmd.all?0:Number.parseInt(cmd.top);

  try {
    const imports = await client.query({
      query: LIST_IMPORTS,
      variables: {
        top
      }
    });

    process.stdout.write(`Top ${top!=0?top:'all'} imports\n`);
    process.stdout.write(`---------------------------------------------------------------------------------------------\n`);
    process.stdout.write('ID                       start date               finish date              status  author\n');
    imports.data.listImports.forEach( imp => {
      const fID = imp.id.toString();
      const fStartDate = imp.startDate.toString();
      const fEndData = imp.finishDate===null?'':imp.finishDate.toString();
      const fStatus = imp.status.toString();
      const fAuthor = imp.author.username.toString();
      process.stdout.write(`${fID.padEnd(25)}${fStartDate.padEnd(25)}${fEndData.padEnd(25)}${fStatus.padEnd(8)}${fAuthor}\n`);
    });
  } catch (e) {
    e.graphQLErrors.forEach(error => {
      process.stderr.write(`${error.message}\n`);
    });
  }
};
