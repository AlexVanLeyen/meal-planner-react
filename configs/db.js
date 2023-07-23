const mongoose = require("mongoose");
const ConnectionError = require("../errors/ConnectionError");

module.exports = function ({ url }) {
    if (!url) {
        throw new ConnectionError("DB_URL is not defined.");
    }
    return mongoose.connect(url);
}