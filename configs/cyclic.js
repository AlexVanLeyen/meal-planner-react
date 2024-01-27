const CyclicDb = require("@cyclic.sh/dynamodb");
const ConnectionError = require("../errors/ConnectionError");

function connect (config) {
    if (!config.host) {
        throw new ConnectionError("Environment variable DB_HOST is undefined.");
    }

    return CyclicDb(config.host);
}

module.exports = connect;
