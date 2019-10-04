const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const graphql = require("graphql");



const HouseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category"
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  sqft: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: false
  },
  bathrooms: {
    type: Number,
    required: true
  },
});

HouseSchema.statics.updateHouseCategory = (houseId, categoryId) => {
  const House = mongoose.model("house");
  const Category = mongoose.model("category");

  return House.findById(houseId).then(house => {
    // if the house already had a category
    if (house.category) {
      // find the old category and remove this house from it's houses
      Category.findById(house.category).then(oldcategory => {
        oldcategory.houses.pull(house);
        return oldcategory.save();
      });
    }
    //  find the Category and push this house in, as well as set this house's category
    return Category.findById(categoryId).then(newCategory => {
      house.category = newCategory;
      newCategory.houses.push(house);

      return Promise.all([house.save(), newCategory.save()]).then(
        ([house, newCategory]) => house
      );
    });
  });
};

module.exports = mongoose.model("house", HouseSchema);