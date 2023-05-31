const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator');

const EmailTokenSchema = new Schema({
    token: {
        type: String,
        required: [true, 'Please provide token'],
        unique: true
    },
    expiryDate: {
        type: Date,
        required: [true, 'Please provide expiry date']
    },
    lastModifiedDate: {
        type: Date
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    emailActionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmailAction'
    },
});

EmailTokenSchema.plugin(uniqueValidator);
const EmailToken = mongoose.model('EmailToken', EmailTokenSchema);

module.exports = EmailToken;

