const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const graphql = require("graphql");



const BidSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  homeId: {
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