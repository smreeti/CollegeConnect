const UserNotification = require("../models/UserNotifications");

const saveUserNotification = async (userNotification) => {

    const { remarks, post, user, subject } = userNotification;

    await UserNotification.create({
        remarks,
        subject,
        post,
        user
    })
}

module.exports = { saveUserNotification };