/*
  Function to validate the SIGN UP form inputs before submitting them to sever and mongodb.
*/
const handleFormValidation = async (user) => {
  let formErrors = {};

  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    username,
    password,
    collegeInfoId,
  } = user;

  if (!firstName) formErrors["firstName"] = "First name is required.";
  else if (!validateName(firstName))
    formErrors["firstName"] =
      "First name must be atleast 3 characters and cannot contain special characters.";

  if (!lastName) formErrors["lastName"] = "Last name is required.";
  else if (!validateName(lastName))
    formErrors["lastName"] =
      "Last name must be atleast 3 characters and cannot contain special characters.";

  if (!email) formErrors["email"] = "Email is required.";
  else if (!validateEmail(email))
    formErrors["email"] = "Please enter a valid email.";

  if (!mobileNumber) formErrors["mobileNumber"] = "Mobile number is required.";
  else if (!validateMobileNumber(mobileNumber))
    formErrors["mobileNumber"] =
      "Please enter a valid 10 digits mobile number.";

  if (!username) formErrors["username"] = "Username is required.";
  else if (!validateUsername(username))
    formErrors["username"] =
      "Username can only contain letters, numbers, and underscores.";

  if (!password) formErrors["password"] = "Password is required.";
  else if (!validatePassword(password))
    formErrors["password"] =
      "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.";

  if (!collegeInfoId) formErrors["selectedCollege"] = "College is required.";

  return formErrors;
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

const handleLoginFormValidation = async (user) => {
  let formErrors = {};
  const { username, password } = user;

  if (!username)
    formErrors["username"] =
      "Mobile number, username or email address is required.";

  if (!password) formErrors["password"] = "Password is required.";
  else if (!validatePassword(password))
    formErrors["password"] =
      "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.";

  return formErrors;
};

const handleResetPasswordValidation = async (user) => {
  let formErrors = {};
  const { username } = user;

  if (!username) {
    formErrors["username"] =
      "Mobile number, username or email address is required.";
  } else if (
    !validateEmail(username) &&
    !validateUsername(username) &&
    !validateMobileNumber(username)
  ) {
    formErrors["username"] = "Invalid input value";
  }
  return formErrors;
};

const handleUpdatePasswordValidation = async (password, newPassword) => {
  let formErrors = {};

  if (!newPassword) {
    formErrors["password"] = "Please enter new password";
  } else if (!password) {
    formErrors["confirmPassword"] = "Please confirm your password";
  } else if (!validatePassword(newPassword)) {
    formErrors["confirmPassword"] =
      "Must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.";
  } else if (password != newPassword) {
    formErrors["confirmPassword"] = "Both input fields must match";
  }

  return formErrors;
};

export {
  handleFormValidation,
  handleLoginFormValidation,
  handleResetPasswordValidation,
  handleUpdatePasswordValidation,
};
