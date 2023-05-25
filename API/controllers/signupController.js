const User = require('../models/User');

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
        collegInfoId,
        firstName,
        lastName,
        email,
        mobileNumber,
        username,
        password
    } = req.body;


    User.findOne({
        email: email
    })
    .then((savedUser) => {
        return res.status(422).json({ error: "user already exists" })
    })

    try {

        await User.create(req.body);
        res.json({message:"saved successfully"})
        // return res.redirect('/login');
    } catch (error) {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        return res.render('signup', {
            passwordError: false,
            errors: req.flash('validationErrors')
        });
    }
};

module.exports = { signup, signupUser };