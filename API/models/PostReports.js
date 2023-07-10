const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostReportsSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Please provide description']
    },
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    status: {
        type: String
    },
    reportedDate: {
        type: Date,
        default: Date.now
    }
});

const PostReports = mongoose.model('PostReports', PostReportsSchema);
module.exports = PostReports;

