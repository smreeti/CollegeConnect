require("dotenv").config();

module.exports = {
    generateResetPasswordEmail: (username, email, token) => {
        const template = `<!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="utf-8">
                            <title>Password Reset Request</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    padding: 20px;
                                    background-color: #f4f4f4;
                                    border-radius: 5px;
                                }
                            
                                h1 {
                                    color: #333333;
                                    margin-bottom: 20px;
                                }
                                
                                p {
                                    color: #666666;
                                    margin-bottom: 20px;
                                }
                                
                                a {
                                    color: #ffffff !important;
                                    background-color: #007bff;
                                    text-decoration: none;
                                    padding: 10px 20px;
                                    border-radius: 4px;
                                }
                                
                                a:hover {
                                    background-color: #0056b3;
                                }

                                .reset-button{
                                    text-align: center;
                                    margin: 35px auto;
                                }

                                .reset-button a{
                                    color: white !important;
                                }
                        </style>
                        </head>
                            
                        <body>
                            <div class="container">
                                <h1>Password Reset Request</h1>
                                <p>Dear ${username},</p>
                                <p>You have requested a password reset for your account. To proceed with resetting your password, please click the button below:</p>
                                <p class = "reset-button">
                                    <a href="http://localhost:3000/#/updatePassword/${token}">Reset Password</a>
                                </p>
                                <p>If you did not request a password reset, please ignore this email. Your account is still secure.</p>
                                <p>Thank you,</p>
                                <p>College Connect Team</p>
                            </div>
                        </body>
                        </html>
              `;
        return {
            from: process.env.FROM_EMAIL_ADDRESS,
            to: email,
            subject: "Reset Password",
            html: template,
        };
    },
};
