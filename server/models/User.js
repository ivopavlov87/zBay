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
  watchlist: {
    type: Schema.Types.ObjectId,
    ref: "watchlist"
  }
});

UserSchema.statics.generateWatchlist = (userId) => {
  const User = mongoose.model("user");
  const Watchlist = mongoose.model("watchlist");
  return User.findById(userId).then(user => {
    return new Watchlist({ user }).save().then(watchlist => {
      user.watchlist = watchlist;
      return user.save()
    })
  })
}

module.exports = mongoose.model('user', UserSchema);
// module.exports = mongoose.model('user', UserSchema)