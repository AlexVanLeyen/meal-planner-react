const ObjectId = require("mongoose").Types.ObjectId;

/**
 * @param {string} identifier 
 * @returns {boolean}
 */
function isValidIdentifier(identifier) {
    return ObjectId.isValid(identifier);
}

module.exports = {
    isValidIdentifier
}