const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLBoolean } = graphql;
const Watchlist = mongoose.model("watchlist")

const User = mongoose.model("user");

const WatchlistType = new GraphQLObjectType({
    name: "WatchlistType",
    fields: () => ({
        _id: { type: GraphQLID },
        user: {
            type: require('./user_type'),
            resolve(parentValue) {
                return User.findById(parentValue.user)
                    // .populate("user")
                    .then(user => user)
            }
        },
        homes: {
            type: new GraphQLList(require('./home_type')),
            resolve(parentValue) {
                return Watchlist.findById(parentValue._id)
                    .populate("homes")
                    .then(watchlist => watchlist)
            }
        }
    })
})

module.exports = WatchlistType;