const User = require('../models/User.js');
const UserType = require('../models/UserType.js');
const CollegeInfo = require('../models/CollegeInfo.js');

const signup = (req, res) => {
    let username = "";
    let password = "";
    const data = req.flash('data')[0];

    if (data) {
        username = data.username;
        password = data.password;
    }

    return res.render('signup', {
        passwordError: false,
        errors: req.flash('validationErrors')
    });
};

const signupUser = async (req, res) => {
    const {
        collegeInfoId,
        firstName,
        lastName,
        email,
        mobileNumber,
        username,
        password
    } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ error: "User already exists" });
        }

        const collegeInfo = await CollegeInfo.findById(collegeInfoId);
        if (!collegeInfo) {
            return res.status(404).json({ error: "College info not found" });
        }

        const userType = await UserType.findOne({ code: "REGULAR_USER" });
        if (!userType) {
            return res.status(404).json({ error: "User type not found" });
        }

        await User.create({
            collegeInfo,
            userType,
            firstName,
            lastName,
            email,
            mobileNumber,
            username,
            password
        });

        return res.json({ message: "User saved successfully" });
        // return res.redirect('/login');
    } catch (error) {
        const validationErrors = Object.values(error.errors).map((err) => err.message);
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        return res.render('signup', {
            errors: req.flash('validationErrors')
        });
    }
};

module.exports = { signup, signupUser };