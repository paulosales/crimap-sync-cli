/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require('debug').debug('crimemap-sync-cli');
const gql = require('graphql-tag');
const createClient = require('../graphql/client');
const { config } = require('../config');

module.exports = async (username, password) => {
  debug(`${username} is loging-in.`);

  const client = await createClient();

  const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        success message token
      }
    }
  `;

  const res = await client.mutate({mutation: LOGIN, variables: {username, password}});
  if (res.data.login.success) {
    debug(`${username} logged successfuly.`);
    config.set('authToken', res.data.login.token);
    config.save();
    process.stdout.write('You are logged in.\n');    
  } else {
    debug(`${username} failed to login.`);
    process.stderr.write(res.data.login.message + '\n');
  }
};
