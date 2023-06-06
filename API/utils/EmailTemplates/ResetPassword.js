require("dotenv").config();

module.exports = {
  generateResetPasswordEmail: (email, token) => {
    const template = `
        <p>You requested a password reset.</p>
        <h4>Click <a href="http://localhost:3000/#/updatePassword/${token}">here</a> to reset your password.</h4>
      `;

    return {
      from: process.env.FROM_EMAIL_ADDRESS,
      to: email,
      subject: "Reset Password",
      html: template,
    };
  },
};
