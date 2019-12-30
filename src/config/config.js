/**
 * Copyright (c) 2019-present, Paulo Rogério Sales Santos - <paulosales@gmail.com>
 *
 * This source code is licensed under the MIT license found in then
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');
const debug = require('debug').debug('crimemap-sync-cli');

/**
 * This constuctor function is responsible for application configuration persistence.
 */
function Config() {  
  
  let configObj = null;
  const CONFIG_FOLDER = path.resolve(process.env.HOME, '.crime-sync');

  if (!fs.existsSync(CONFIG_FOLDER)) {
    fs.mkdirSync(CONFIG_FOLDER);
  }

  function getConfigObj() {
    if (configObj === null ) {
      debug('loading configuration file');
      const configFile = path.resolve(CONFIG_FOLDER, 'config.json');
      if (!fs.existsSync(configFile)) {
        debug(`The config file '${configFile}' not exists. Returing a empty configuration.`);
        configObj = {};
        return configObj;
      }
    
      const jsonConfig = fs.readFileSync(configFile);
      configObj = JSON.parse(jsonConfig);
      debug(`configuration loaded ${jsonConfig}`);
    }
    return configObj;
  }

  /**
   * Get a configuration by the key name.
   * @param {String} key configuration key name.
   * @returns Configuration value.
   */
  this.get = async function Config_get(key) {
    return getConfigObj()[key];
  };

  /**
   * Set a configuration by key name.
   * @param {String} key configuration key name.
   * @param {String} value configuration value.
   */
  this.set = async function Config_set(key, value) {
    getConfigObj()[key] = value;
  }

  /**
   * Persist the configuration on the filesystem.
   */
  this.save = async function Config_save() {
    debug('saving configuration.');
    if (configObj === null ) {
      configObj = {};
    }
    const configFile = path.resolve(CONFIG_FOLDER, 'config.json');
    const jsonConfig = JSON.stringify(configObj, null, 2);
    fs.writeFileSync(configFile, jsonConfig);
    debug(`configuration saved ${jsonConfig}`);
  }
}

module.exports = new Config();
