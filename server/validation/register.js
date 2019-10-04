const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateLoginInput(data) {
  data.name = validText(data.username) ? data.username : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    return { message: "Email is invalid", isValid: false };
  };

  if (Validator.isEmpty(data.email)) {
    return { message: "Email field is required", isValid: false };
  };

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  if (!Validator.isLength(data.password, { min: 8, max: 32 })) {
    return {
      message: "Password length needs to be between 8 and 32 characters",
      isValid: false
    }
  };

  if (!Validator.isLength(data.username, { min: 2, max: 32 })) {
    return {
      message: "Userame length needs to be between 2 and 32 characters",
      isValid: false
    }
  };

  if (Validator.isEmpty(data.username)) {
    return {
      message: "Username cannot be empty",
      isValid: false
    }
  };

  return {
    message: "",
    isValid: true
  };
};