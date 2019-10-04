//  A category simply contains a name and an array of houses.

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  houses: [{
    type: Schema.Types.ObjectId,
    ref: 'house'
  }]
});

CategorySchema.statics.findHouse = function(categoryId) {
  return this.findById(categoryId)
  .populate("houses")
  .then(category => category.houses)
}

module.exports = mongoose.model("category", CategorySchema);