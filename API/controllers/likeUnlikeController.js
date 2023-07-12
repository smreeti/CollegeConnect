const Post = require("../models/Post");
const HttpStatus = require("../utils/HttpStatus.js");
const {
  setSuccessResponse,
  setErrorResponse,
} = require("../utils/Response.js");

//return setSuccessResponse(res, "Posts fetched successfully", {
//     postDetails,
// });

const likeUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      const removeLike = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);
      post.likes.splice(removeLike, 1);
      await post.save();
      response.json(post.likes);
      return setSuccessResponse(res, "Post has been liked", {
        post,
      });
    } else {
      post.likes.unshift({ user: req.user.id });
      await post.save();
      response.json(post.likes);
      return setSuccessResponse(res, "Post has been unliked", {
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
