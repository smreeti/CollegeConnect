const Post = require("../models/Post");
const HttpStatus = require("../utils/HttpStatus.js");
const {
  setSuccessResponse,
  setErrorResponse,
} = require("../utils/Response.js");

const likeUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    console.log("Post controller", post);
    const hasLike = post.likes.filter((like) => {
      return like.user.toString() === req.user.id;
    });

    if (hasLike.length > 0) {
      console.log("The length", hasLike.length);
      const removeLike = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      console.log(removeLike);
      post.likes.splice(removeLike, 1);
      await post.save();
      return setSuccessResponse(res, "Post has been unliked", {
        post,
      });
    } else {
      post.likes.unshift({ user: req.user.id });
      await post.save();
      console.log(post);
      return setSuccessResponse(res, "Post has been liked", {
        post,
      });
    }
  } catch (err) {
    console.error(err.message);
    return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

module.exports = {
  likeUnlikePost,
};
