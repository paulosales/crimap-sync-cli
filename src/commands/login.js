/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require("debug").debug("crimemap-sync-cli");
const gql = require("graphql-tag");
const getClient = require("../graphql/client");
const { config } = require("../config");

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
      message
      token
    }
  }
`;

module.exports = async (username, password) => {
  debug("%s is loging-in.", username);

  const client = await getClient();

  const res = await client.mutate({
    mutation: LOGIN,
    variables: { username, password }
  });
  if (res.data.login.success) {
    debug("%s logged successfuly.", username);
    debug("saving authtoken");
    await config.set("authToken", res.data.login.token);
    await config.save();
    debug("authtoken saved.");
    process.stdout.write("You are logged in.\n");
  } else {
    debug("%s failed to login.", username);
    process.stderr.write(res.data.login.message + "\n");
  }
};
