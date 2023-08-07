const Post = require("../models/Post");
const User = require("../models/User");
const UserType = require("../models/UserType");
const HttpStatus = require("../utils/HttpStatus");
const { setErrorResponse, setSuccessResponse } = require("../utils/Response");

const fetchDataForDoughnutChart = async (req, res) => {
  const loggedInUser = req.user;
  const { userTypeId } = loggedInUser;
  const { collegeInfoId } = req.body;

  const isMasterAdmin = loggedInUser.userTypeId?.code == "MASTER_ADMIN";

  if (loggedInUser.userTypeId?.code == "SUPER_ADMIN" || isMasterAdmin) {
    const regularUserType = await UserType.findOne({ code: "REGULAR_USER" });

    if (!regularUserType)
      return setErrorResponse(
        res,
        HttpStatus.NOT_FOUND,
        "Regular users not found"
      );

    const totalRegularUsers = await fetchTotalRegularUsers(
      collegeInfoId?._id,
      regularUserType._id,
      isMasterAdmin
    );

    const totalCollegePosts = await fetchTotalCollegePosts(
      collegeInfoId?._id,
      userTypeId._id,
      isMasterAdmin
    );

    const totalUserPosts = await fetchTotalUserPosts(
      collegeInfoId?._id,
      regularUserType._id,
      isMasterAdmin
    );

    const doughnutChartData = {
      totalRegularUsers,
      totalCollegePosts,
      totalUserPosts,
      totalPosts: totalCollegePosts + totalUserPosts,
    };

    return setSuccessResponse(res, HttpStatus.OK, doughnutChartData);
  } else {
    return setErrorResponse(
      res,
      HttpStatus.BAD_REQUEST,
      "Only admin can access this page"
    );
  }
};

const getMonthName = (monthNumber) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[monthNumber - 1] || "Unknown";
};

const fetchDataForBarChart = async (req, res) => {
  const loggedInUser = req.user;
  if (loggedInUser.userTypeId.code == "SUPER_ADMIN") {
    try {
      // The result will be an array of objects containing the month and the total count
      // Example: [{ _id: 1, count: 10 }, { _id: 2, count: 15 }, ...]
      const totalPostsByMonth = await Post.aggregate([
        {
          $group: {
            _id: { $month: "$createdDate" },
            count: { $sum: 1 },
          },
        },
      ]);

      // Transform the result to include month names and set count to 0 if not found
      const transformedData = Array.from({ length: 12 }, (_, index) => {
        const monthNumber = index + 1;
        const monthName = getMonthName(monthNumber);
        const count =
          totalPostsByMonth.find((item) => item._id === monthNumber)?.count ||
          0;
        return { month: monthName, count };
      });

      return setSuccessResponse(res, HttpStatus.OK, transformedData);
    } catch (error) {
      console.error(error);
      return setErrorResponse(
        res,
        HttpStatus.BAD_REQUEST,
        "Something went wrong"
      );
    }
  } else {
    return setErrorResponse(
      res,
      HttpStatus.BAD_REQUEST,
      "Only admin can access this page"
    );
  }
};

const fetchTotalRegularUsers = async (collegeInfoId, regularUserTypeId, isMasterAdmin) => {
  const totalRegularUsers = isMasterAdmin ? await User.countDocuments({
    userTypeId: regularUserTypeId,
  }) : await User.countDocuments({
    userTypeId: regularUserTypeId,
    collegeInfoId,
  });
  return totalRegularUsers;
};

const fetchTotalCollegePosts = async (collegeInfoId, adminUserTypeId, isMasterAdmin) => {
  try {
    const totalCollegePostsCount =
      isMasterAdmin ? await Post.countDocuments({
        isCollegePost: "Y",
        status: "ACTIVE",
      }).populate({
        path: "postedBy",
        match: {
          userTypeId: adminUserTypeId,
        },
      }) :
        await Post.countDocuments({
          isCollegePost: "Y",
          status: "ACTIVE",
        }).populate({
          path: "postedBy",
          match: {
            collegeInfoId: collegeInfoId,
            userTypeId: adminUserTypeId,
          },
        });
    return totalCollegePostsCount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const fetchTotalUserPosts = async (collegeInfoId, regularUserTypeId, isMasterAdmin) => {
  try {
    const totalUserPostsCount = isMasterAdmin ? await Post.countDocuments({
      isCollegePost: "N",
      status: "ACTIVE",
    }).populate({
      path: "postedBy",
      match: {
        userTypeId: regularUserTypeId,
      },
    }) : await Post.countDocuments({
      isCollegePost: "N",
      status: "ACTIVE",
    }).populate({
      path: "postedBy",
      match: {
        collegeInfoId: collegeInfoId,
        userTypeId: regularUserTypeId,
      },
    });
    return totalUserPostsCount;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  fetchDataForDoughnutChart,
  fetchDataForBarChart

};
