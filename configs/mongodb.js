const mongoose = require("mongoose");
const ConnectionError = require("../errors/ConnectionError");
const logger = require("./logger");

/**
 * @typedef {Object} DBConfig
 * @property {string} host example localhost, myapp.com, 0.0.0.0
 * @property {string} username
 * @property {string} password
 * @property {string} [port] The default port is 27017
 */

/**
 * @param {DBConfig} config 
 * @returns {string}
 */
function getUrl({host, username, password, port="27017"}) {
    return `mongodb://${username}:${password}@${host}:${port}`;
}

/**
 * Creates a connection with the MongoDB database.
 * @param {DBConfig} 
 * @returns {Promise<typeof mongoose>}
 */
function connect(config) {
    if (!config.host) {
        throw new ConnectionError("Environment variable DB_HOST is undefined.");
    }

    const url = getUrl(config)
    mongoose.connection.once('connected', () => logger.info('Connected to database.'));
    mongoose.connection.on('connecting', () => logger.info('Attempting to connect to database...'));
    mongoose.connection.on('reconnected', () => logger.info('Reconnected to database.'));
    mongoose.connection.on('disconnected', () => logger.warning('Unexpected disconnect from database.'));
    mongoose.connection.on('error', error => logger.error(error));    
    return mongoose.connect(url);
}

module.exports = connect;
