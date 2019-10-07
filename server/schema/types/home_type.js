// Write the home type schema on your own. Recall that
// homes have an _id, name, category, description,
// and sqft.Again, don't worry about the cost field
// for now - we will add that later.

const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLBoolean } = graphql;

const Home = mongoose.model("home")
const BidType = require('./bid_type')

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
    streetAddress: { type: GraphQLString},
    city: { type: GraphQLString},
    state: { type: GraphQLString},
    yearBuilt: { type: GraphQLInt },
    sqft: { type: GraphQLInt },
    zipcode: { type: GraphQLInt },
    stories: { type: GraphQLInt },
    bedrooms: { type: GraphQLInt },
    bathrooms: { type: GraphQLFloat },
    garage: { type: GraphQLBoolean },
    basement: { type: GraphQLBoolean },
    searchField: { type: GraphQLString },
    bids: { type: GraphQLList(BidType) }
  })
});

module.exports = HomeType;










