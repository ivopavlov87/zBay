// Users have an _id, name, and email

const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;
const Watchlist = mongoose.model("watchlist");

const UserType = new GraphQLObjectType({
  name: "UserType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean },
    watchlist: {
      type: require('./watchlist_type'),
      resolve(parentValue){
        return Watchlist.findById(parentValue.watchlist)
          .then(watchlist => watchlist)
      }}
  })
});

module.exports = UserType;