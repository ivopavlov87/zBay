const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/keys");

// here is our validator function
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }
    // deconstruct our data
    const { username, email, password } = data;

    // we want to wait until our model can tell us whether a user exists with that email
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new Error("This email is already used");
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      throw new Error("This username is taken");
    }

    // hash our password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user with all our arguments
    const user = new User(
      {
        username,
        email,
        password: hashedPassword
      },
      err => {
        if (err) throw err;
      }
    );

    // save our user
    user.save();
    // we'll create a token for the user
    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
    return { token, _id: user._id, loggedIn: true, ...user._doc, password: null };

  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {
    // use our other validator we wrote to validate this data
    const { message, isValid } = validateLoginInput(data);

    if (!isValid) {
      throw new Error(message);
    }
    const { email, password } = data
    const user = await User.findOne({email})
    if (!user) {
      throw new Error("This user does not exist");
    }

    const correctPassword = await bcrypt.compareSync(password, user.password);
    if (!correctPassword) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    return { token, _id: user._id, loggedIn: true, ...user._doc, password: null };
  } catch (err) {
    throw err;
  }
};

const logout = async data => {
  try {
    const { _id } = data;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("This user does not exist");
    }

    const token = "";
    return { token, loggedIn: false, ...user._doc, password: null}
  } catch (err) {
    throw err;
  }
}

const verifyUser = async data => {
  try {
    // we take in the token from our mutation
    const { token } = data;
    // we decode the token using our secret password to get the
    // user's id
    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;

    // then we try to use the User with the id we just decoded
    // making sure we await the response
    let currentUser;
    const loggedIn = await User.findById(id).then(user => {
      currentUser = user ? user : null;
      return user ? true : false;
    });

    return { loggedIn, _id: currentUser._id };
  } catch (err) {
    return { loggedIn: false, _id: null };
  }
};

module.exports = { register, login, logout, verifyUser };