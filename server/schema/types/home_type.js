// Write the home type schema on your own. Recall that
// homes have an _id, name, category, description,
// and sqft.Again, don't worry about the cost field
// for now - we will add that later.

const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID } = graphql;

const Home = mongoose.model("home")

const HomeType = new GraphQLObjectType({
  name: "HomeType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    category: { 
      type: require('./category_type'),
      resolve(parentValue) {
        return Home.findById(parentValue._id)
          .populate("category")
          .then(home => {
            return home.category
          });
      }
     },
    description: { type: GraphQLString},
    sqft: { type: GraphQLInt },
    bathrooms: { type: GraphQLFloat },
  })
});

module.exports = HomeType;










