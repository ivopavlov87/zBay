//  A category simply contains a name and an array of homes.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  homes: [{
    type: Schema.Types.ObjectId,
    ref: 'home'
  }]
});

CategorySchema.statics.findHome = function(categoryId) {
  return this.findById(categoryId)
  .populate("home")
  .then(category => category.homes)
}

module.exports = mongoose.model("category", CategorySchema);