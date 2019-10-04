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
    homes: {
      type: new GraphQLList(require('./home_type')),
      resolve(parentValue) {
        return Category.findHomes(parentValue._id)
      }
    }
  })
});

module.exports = CategoryType;
