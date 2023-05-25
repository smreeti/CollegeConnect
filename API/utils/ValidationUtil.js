const User = require('../models/User.js');

const validateField = (field) => {
    return !!field;
};

const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]{3,}$/;
    return nameRegex.test(name);
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateMobileNumber = (mobileNumber) => {
    const mobileNumberRegex = /^\d{10}$/;
    return mobileNumberRegex.test(mobileNumber);
};

const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
};

const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
};

const validateUser = async (req) => {
    const {
        firstName,
        lastName,
        email,
        mobileNumber,
        username,
        password
    } = req.body;

    const errors = [];

    if (!validateField(firstName))
        errors.push("Please enter first name.");
    else if (!validateName(firstName))
        errors.push("First name cannot contain special characters.");

    if (!validateField(lastName))
        errors.push("Please enter last name");
    else if (!validateName(lastName))
        errors.push("Last name cannot contain special characters.");

    if (!validateField(email))
        errors.push("Please enter email");
    else if (!validateEmail(email))
        errors.push("Please enter a valid email");

    if (!validateField(mobileNumber))
        errors.push("Please enter mobile number");
    else if (!validateMobileNumber(mobileNumber))
        errors.push("Please enter a valid mobile number.");

    if (!validateField(username))
        errors.push("Please enter username");
    else if (!validateUsername(username))
        errors.push("Username can only contain letters, numbers, and underscores.");

    if (!validateField(password))
        errors.push("Please enter password");
    else if (!validatePassword(password))
        errors.push("Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.");

    const existingUser = await User.findOne({
        $or: [
            { email: email },
            { mobileNumber: mobileNumber },
            { username: username }
        ]
    });

    if (existingUser)
        errors.push("User already exists");

    return errors;
};

module.exports = {
    validateField,
    validateUser
}