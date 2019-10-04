const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const Category = mongoose.model("category");

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    houses: {
      type: new GraphQLList(require('./house_type')),
      resolve(parentValue) {
        return Category.findHouses(parentValue._id)
      }
    }
  })
});

module.exports = CategoryType;
