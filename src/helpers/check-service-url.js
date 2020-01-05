/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require("debug").debug("crimemap-sync-cli");
const fetch = require("node-fetch");
const gql = require("graphql-tag");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { HttpLink } = require("apollo-link-http");
const { ApolloClient } = require("apollo-client");

module.exports = async function checkServiceUrl(serviceUrl) {
  debug(`Checking if the service URL '${serviceUrl}' is valid.`);
  try {
    const cache = new InMemoryCache();
    const link = new HttpLink({
      uri: serviceUrl,
      fetch
    });

    const client = new ApolloClient({
      cache,
      link
    });

    const INFO = gql`
      query {
        info {
          version
          name
        }
      }
    `;

    const res = await client.query({ query: INFO });
    debug(`service test request result: ${res.data.info.name}`);
    const isValid = res.data.info.name === "crimemap-sync-api";
    debug(`is valid = ${isValid}.`);
    return isValid;
  } catch (e) {
    debug(`is valid = false because it raises the exception ${e.message}.`);
    return false;
  }
};
