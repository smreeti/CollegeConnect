const Post = require("../models/Post");
const HttpStatus = require("../utils/HttpStatus.js");
const {
  setSuccessResponse,
  setErrorResponse,
} = require("../utils/Response.js");
const { validateImage } = require("../utils/ValidationUtil");
const { fetchFollowingUsers } = require("./userFollowingController");

const savePost = async (req, res) => {
  const { caption, imageUrl } = req.body;
  try {
    let errors = await validateImage(imageUrl);
    const user = req.user;
    const isAdminUserType =
      user.userTypeId.code == "SUPER_ADMIN" || user.userTypeId.code == "ADMIN";

    if (errors.length > 0)
      return setErrorResponse(res, HttpStatus.BAD_REQUEST, errors);

    await Post.create({
      caption,
      imageUrl,
      postedBy: req.user,
      isCollegePost: isAdminUserType ? "Y" : "N",
    });

    return setSuccessResponse(res, { message: "Post saved successfully" });
  } catch (error) {
    return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const fetchAllPosts = async (req, res) => {
  const loggedInUser = req.user;
  try {
    const followingUsers = await fetchFollowingUsers(loggedInUser._id);

    const posts = await Post.find({
      postedBy: { $in: followingUsers },
      isCollegePost: "Y",
    })
      .populate("postedBy")
      .sort({ createdDate: -1 });

    if (posts)
      return setSuccessResponse(res, "Posts fetched successfully", posts);
    else
      return setErrorResponse(
        res,
        HttpStatus.NOT_FOUND,
        "Error fetching posts"
      );
  } catch (error) {
    return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const fetchUserPosts = async (loggedInUser) => {
  try {
    const posts = await Post.find({
      postedBy: loggedInUser,
      isCollegePost: "N",
      status: "ACTIVE"
    })
      .select("imageUrl likes comments")
      .sort({ createdDate: -1 });

    return posts;
  } catch (error) {
    return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const fetchPostDetails = async (req, res) => {
  const { _id } = req.body;
  try {
    const postDetails = await Post.find({
      _id,
    })
      .populate({
        path: "postedBy",
        select: "username",
        status: "ACTIVE"
      })
      .select("imageUrl likes comments caption createdDate");

    return setSuccessResponse(res, "Posts fetched successfully", {
      postDetails,
    });
  } catch (error) {
    return setErrorResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

const fetchPostById = async (postId) => {
  return await Post.findById(postId);
}

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    response.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updatePostStatus = async (postId, status, remarks) => {
  await Post.findByIdAndUpdate(postId, {
    status, remarks
  }, { new: true });
}

module.exports = {
  savePost,
  fetchAllPosts,
  fetchUserPosts,
  fetchPostDetails,
  likePost,
  fetchPostById,
  updatePostStatus
};
