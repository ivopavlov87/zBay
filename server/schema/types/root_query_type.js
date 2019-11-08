const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLBoolean } = graphql;

const UserType = require("./user_type");
const User = mongoose.model("user");

const CategoryType = require("./category_type");
const Category = mongoose.model("category");

const HomeType = require("./home_type");
const Home = mongoose.model("home");

const BidType = require("./bid_type");
const Bid = mongoose.model("bid");


const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    category: {
      type: CategoryType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Category.findById(args._id);
      }
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve() {
        return Category.find({});
      }
    },
    home: {
      type: HomeType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return Home.findById(args._id);
      }
    },
    homes: {
      type: new GraphQLList(HomeType),
      resolve() {
        return Home.find({});
      }
    },
    searchHomes: {
      type: new GraphQLList(HomeType),
      args: { searchQuery: { type: GraphQLString }},
      resolve(_, { searchQuery }) {
        if (searchQuery === ""){
          return Home.find({});

        }
        return Home.find({ searchField: new RegExp(`${searchQuery}`, 'i')})
      }
    },
    bids: {
      type: new GraphQLList(BidType),
      resolve() {
        return Bid.find({});
      }
    },
    bid: {
      type: BidType,
      args: { _id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(_, { _id }) {
        return Bid.findById(_id);
      }
    },
    homeBids: {
      type: new GraphQLList(BidType),
      args: { _homeId: { type: GraphQLID } },
      resolve(_, { _homeId }) {
        return Home.findBids(_homeId);
      }
    },
    userHomes: {
      type: new GraphQLList(HomeType),
      args: { _userId: { type: GraphQLID } },
      resolve(_, { _userId }) {
        return Home.find({user: _userId});
      }
    }
  })
});

module.exports = RootQueryType;