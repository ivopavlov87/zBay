const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLBoolean } = graphql;

const Bid = mongoose.model("home");

const BidType = new GraphQLObjectType({
    name: "BidType",
    fields: () => ({
        _id: { type: GraphQLID },
        userId: {
            type: require('./user_type'),
            resolve(parentValue){
                return User.findById(parentValue._id)
                    .populate("userId")
                    .then(user => user._id)
            } 
        },
        homeId: {
            type: require('./home_type'),
            resolve(parentValue){
                return Home.findById(parentValue._id)
                    .populate("homeId")
                    .then(home => home._id)
            }},
        amount: { type: GraphQLInt }
    })
})

module.exports = BidType;