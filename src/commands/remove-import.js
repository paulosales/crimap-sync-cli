/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require("debug").debug("crimemap-sync-cli");
const gql = require("graphql-tag");
const getClient = require("../graphql/client");

const REMOVE_IMPORT = gql`
  mutation RemoveImport($id: ID!) {
    removeImport(id: $id) {
      id
    }
  }
`;

module.exports = async id => {
  debug("removing import id %s.", id);
  if (id.length !== 24) {
    debug("ID %s is invalid", id);
    process.stderr.write(`The id '${id}' is invalid.\n`);
    return;
  }

  const client = await getClient();

  try {
    const removed = await client.mutate({
      mutation: REMOVE_IMPORT,
      variables: {
        id
      }
    });
    process.stdout.write(`Import '${removed.data.removeImport.id}' removed.\n`);
    debug("Import %s removed", removed.data.removeImport.id);
  } catch (e) {
    debug("error removing import id %s: %s.", id, e.message);
    e.graphQLErrors.forEach(error => {
      process.stderr.write(`${error.message}\n`);
    });
  }
};
