const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLBoolean } = graphql;

const Bid = mongoose.model("bid");
const Home = mongoose.model("home");
const User = mongoose.model("user");

const BidType = new GraphQLObjectType({
    name: "BidType",
    fields: () => ({
        _id: { type: GraphQLID },
        user: {
            type: require('./user_type'),
            resolve(parentValue){
                return User.findById(parentValue.user)
                    .then(user => user)
            } 
        },
        home: {
            type: require('./home_type'),
            resolve(parentValue){
                return Home.findById(parentValue.home)
                    .then(home => home)
            }},
        amount: { type: GraphQLInt },
        date: { type: GraphQLString }
    })
})

module.exports = BidType;