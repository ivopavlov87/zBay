const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../../config/keys");


const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const register = async data => {
  try {
    const { message, isValid } = validateRegisterInput(data);

    if (!isValid) {
      throw new Error(message);
    }

    const { username, email, password } = data;


    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      throw new Error("This email is already used");
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      throw new Error("This username is taken");
    }


    const hashedPassword = await bcrypt.hash(password, 10);


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


    user.save();

    const token = jwt.sign({ id: user._id }, keys.secretOrKey);

    // then return our created token, set loggedIn to be true, null their password, and send the rest of the user
    return { token, _id: user._id, loggedIn: true, ...user._doc, password: null };

  } catch (err) {
    throw err;
  }
};

const login = async data => {
  try {

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

    const { token } = data;

    const decoded = jwt.verify(token, keys.secretOrKey);
    const { id } = decoded;


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