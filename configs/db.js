const mongoose = require("mongoose");
const ConnectionError = require("../errors/ConnectionError");
const logger = require("./logger");

module.exports = function ({ url }) {
    if (!url) {
        throw new ConnectionError("DB_URL is not defined.");
    }

    mongoose.connection.on('error', error => logger.error(error));
    mongoose.connection.on('disconnected', () => logger.error('Unexpected disconnect from database.'));

    return mongoose.connect(url);
}