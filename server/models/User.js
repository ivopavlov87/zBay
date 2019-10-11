// A user has a name, an email address, a date, and a password.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  date: {
    type: Date,
    default: Date.now
  },
  // homes: [{
  //     type: Schema.Types.ObjectId,
  //     ref: "home"
  // }]
});

// UserSchema.statics.findHomes = (_userId) => {
//   const User = mongoose.model("user");
//   return User.findById(_userId)
//     .populate("homes")
//     .then(user => user.homes);
// };


module.exports = mongoose.model('user', UserSchema);
// module.exports = mongoose.model('user', UserSchema)
