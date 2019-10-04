// Write the house type schema on your own. Recall that
// houses have an _id, name, category, description,
// and sqft.Again, don't worry about the cost field
// for now - we will add that later.

const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;

const House = mongoose.model("house")

const HouseType = new GraphQLObjectType({
  name: "HouseType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { 
      type: require('./category_type'),
      resolve(parentValue) {
        return House.findById(parentValue._id)
          .populate("category")
          .then(house => {
            return house.category
          });
      }
     },
    description: { type: GraphQLString},
    sqft: { type: GraphQLInt }
  })
});

module.exports = HouseType;










