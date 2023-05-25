const User = require('../models/User.js');
const UserType = require('../models/UserType.js');
const CollegeInfo = require('../models/CollegeInfo.js');
const {
    validateField,
    validateUser
} = require('../utils/ValidationUtil.js')

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

    const errors = await validateUser(req, res);

    const collegeInfo = await CollegeInfo.findById(collegeInfoId);
    if (!validateField(collegeInfo))
        errors.push("College info not found");

    const userType = await UserType.findOne({ code: "REGULAR_USER" });
    if (!validateField(userType))
        errors.push("User type not found");

    parseErrors(errors, res);

    try {
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
        // const validationErrors = Object.values(error.errors).map((err) => err.message);
        // req.flash('validationErrors', validationErrors);
        // req.flash('data', req.body);
        // return res.render('signup', {
        //     errors: req.flash('validationErrors')
        // });
        return res.status(404).json({ error: errors });
    }
};


const parseErrors = (errors, res) => {
    if (errors.length > 0) {
        // return res.render('signup', {
        //     errors
        // });

        return res.status(404).json({ error: errors });
    }
}

module.exports = { signupUser };