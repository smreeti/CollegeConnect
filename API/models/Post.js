const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    imageUrl: {
        type: String,
        required: [true, 'Please provide image url']
    },
    caption: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    createdDate: {
        type: Date,
        default: new Date()
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    isCollegePost: {
        type: String
    }
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;

