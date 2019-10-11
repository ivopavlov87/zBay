const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const BidSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  home: {
    type: Schema.Types.ObjectId,
    ref: "home"
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("bid", BidSchema);