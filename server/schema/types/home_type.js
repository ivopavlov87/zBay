// Write the home type schema on your own. Recall that
// homes have an _id, name, category, description,
// and sqft.Again, don't worry about the cost field
// for now - we will add that later.

const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLBoolean } = graphql;

const Home = mongoose.model("home");
const BidType = require('./bid_type');
// const UserType = require("./user_type");
const User = mongoose.model("user");



const HomeType = new GraphQLObjectType({
  name: "HomeType",

  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    user: {
      type: require("./user_type"),
      resolve(parentValue) {

        return User.findById(parentValue.user).then(user => {
          return user;
        });
      }
    },
    category: {
      type: require("./category_type"),
      resolve(parentValue) {
        return (
          Category.findById(parentValue.category)
            // .populate("category")
            .then(category => {
              return category;
            })
        );
      }
    },
    description: { type: GraphQLString },
    streetAddress: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    yearBuilt: { type: GraphQLInt },
    sqft: { type: GraphQLInt },
    zipcode: { type: GraphQLInt },
    stories: { type: GraphQLInt },
    bedrooms: { type: GraphQLInt },
    price: { type: GraphQLInt },
    bathrooms: { type: GraphQLFloat },
    garage: { type: GraphQLBoolean },
    images: { type: new GraphQLList(GraphQLString) },
    basement: { type: GraphQLBoolean },
    searchField: { type: GraphQLString },
    bids: {
      type: new GraphQLList(BidType),
      resolve(parentValue) {
        return Home.findById(parentValue._id)
          .populate("bids")
          .then(home => home.bids)

        }
      },
    coordinates: {type: new GraphQLList(GraphQLFloat)},
    date: { type: GraphQLString }
  })
});

module.exports = HomeType;










