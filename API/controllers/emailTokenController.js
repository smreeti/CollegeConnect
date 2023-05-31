const EmailToken = require("../models/EmailToken");

const createEmailToken = async (token, expiryDate, userId, emailActionId) => {
    await EmailToken.create({
        token,
        expiryDate,
        lastModifiedDate: Date.now(),
        userId,
        emailActionId,
    });
};

module.exports = { createEmailToken }