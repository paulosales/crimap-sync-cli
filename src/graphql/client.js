/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const debug = require("debug").debug("crimemap-sync-cli");
const readline = require("readline-sync");
const fetch = require("node-fetch");
const { ApolloClient } = require("apollo-client");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { createHttpLink } = require("apollo-link-http");
const { setContext } = require("apollo-link-context");
const checkServiceUrl = require("../helpers/check-service-url");
const { config } = require("../config");

let client;
async function getClient() {
  if (!client) {
    let serviceUrl;
    while (!serviceUrl) {
      debug("getting the serviceUrl.");
      serviceUrl = await config.get("serviceUrl");
      debug(`serviceUrl = ${serviceUrl}`);
      if (!serviceUrl) {
        debug("Asking the serviceUrl to user.");
        serviceUrl = readline.question(
          "Please inform the service crime map api url: "
        );

        if (await checkServiceUrl(serviceUrl)) {
          config.set("serviceUrl", serviceUrl);
          await config.save();
          process.stdout.write(`Service url ${serviceUrl} saved.\n`);
        } else {
          process.stdout.write(
            `The service URL ${serviceUrl} is not valid or the service is not available.\n`
          );
          process.stdout.write(`Try again or type CTRL + C to cancel.\n`);
          serviceUrl = null;
        }
      } else {
        break;
      }
    }

    const authToken = await config.get("authToken");

    const cache = new InMemoryCache();

    const httpLink = createHttpLink({ uri: serviceUrl, fetch });
    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: authToken ? `Bearer ${authToken}` : ""
        }
      };
    });

    client = new ApolloClient({
      cache,
      link: authLink.concat(httpLink)
    });
  }

  return client;
}

module.exports = getClient;
