/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require('debug').debug('crimemap-sync-cli');
const gql = require('graphql-tag');
const getClient = require('../graphql/client');

const IMPORT = gql`
  mutation Import($pdfUrl: String!) {
    import(pdfUrl: $pdfUrl) {
      id startDate status file { name }
    }
  }
`;

module.exports = async (pdfUrl) => {
  debug('Importing file %s', pdfUrl);

  const client = await getClient();

  try {
    const imported = await client.mutate({
      mutation: IMPORT,
      variables: { pdfUrl }
    });
    const { id, file } = imported.data.import;

    debug('File %s imported. Generated ID %s.', file.name, id);
    process.stdout.write(`File '${file.name}' imported.\nGenerated ID: ${id}\n`);
  } catch(e) {
    debug('Error importing file %s: ', pdfUrl, e.message);
    e.graphQLErrors.forEach( error => {
      process.stderr.write(`${error.message}\n`);
    });
  }
};
