// Users have an _id, name, and email

const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = graphql;

const HomeType = require("./home_type");
const Home = mongoose.model("home");

const BidType = require("./bid_type");
const Bid = mongoose.model("bid");

const User = mongoose.model("user");


const UserType = new GraphQLObjectType({
  name: "UserType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    // homes: {
    //   type: new GraphQLList(require("./home_type")),
    //   resolve(parentValue) {
    //     // console.log(parentValue);
    //     return User.findById(parentValue._id)
    //       .populate("homes")
    //       .then(user => user.homes);
    //   }
    // }
  })
});

module.exports = UserType;