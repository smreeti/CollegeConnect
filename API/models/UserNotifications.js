const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserNotificationSchema = new Schema({
    notificationDate: {
        type: Date,
        default: Date.now
    },
    subject: {
        type: String,
    },
    remarks: {
        type: String
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const UserNotification = mongoose.model('UserNotification', UserNotificationSchema);

module.exports = UserNotification;

