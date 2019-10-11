// Users have an _id, name, and email
const mongoose = require("mongoose");
const User = mongoose.model("user")
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",

  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    watchlist: {
      type: new GraphQLList(require("./home_type")),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate("watchlist")
          .then(user => user.watchlist)
      }
    }
  })
});

module.exports = UserType;