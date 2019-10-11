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


module.exports = mongoose.model('user', UserSchema);
// module.exports = mongoose.model('user', UserSchema)