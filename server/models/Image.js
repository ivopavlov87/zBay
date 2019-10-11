const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  publicId: {
    type: String,
    required: true
  },
  home: {
    type: Schema.Types.ObjectId,
    ref: 'homes'
  }
})

module.exports = mongoose.model("image", ImageSchema);