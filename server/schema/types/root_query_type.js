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

// const WatchlistType = require("./watchlist_type");
// const Watchlist = mongoose.model("watchlist");

// defined, never used . . . take out????
const ImageType = require('./image_type');
const Image = mongoose.model('image');

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
          // return []
        }
        return Home.find({ searchField: new RegExp(`${searchQuery}`, 'i')})
      }
    },
    advancedSearch: {
      type: new GraphQLList(HomeType),
      args: { 
        nameQuery: { type: GraphQLString },
        categoryQuery: { type: GraphQLString },
        descriptionQuery: { type: GraphQLString },
        streetAddressQuery: { type: GraphQLString },
        cityQuery: { type: GraphQLString },
        stateQuery: { type: GraphQLString },
        yearBuiltQuery: { type: GraphQLInt },
        sqftQuery: { type: GraphQLInt },
        zipcodeQuery: { type: GraphQLInt },
        storiesQuery: { type: GraphQLInt },
        bedroomsQuery: { type: GraphQLInt },
        bathroomsQuery: { type: GraphQLFloat },
        garageQuery: { type: GraphQLBoolean },
        basementQuery: { type: GraphQLBoolean }
      },
      resolve(_, args) {
        return Home.find({
          name: new RegExp(`${nameQuery}`, "i"),
          category: new RegExp(`${categoryQuery}`, "i"),
          description: new RegExp(`${descriptionQuery}`, "i"),
          streetAddress: new RegExp(`${streetAddressQuery}`, "i"),
          city: new RegExp(`${cityQuery}`, "i"),
          state: new RegExp(`${stateQuery}`, "i"),
          yearBuilt: new RegExp(`${yearBuiltQuery}`, "i"),
          sqft: new RegExp(`${sqftQuery}`, "i"),
          zipcode: new RegExp(`${zipcodeQuery}`, "i"),
          stories: new RegExp(`${storiesQuery}`, "i"),
          bedrooms: new RegExp(`${bedroomsQuery}`, "i"),
          bathrooms: new RegExp(`${bathroomsQuery}`, "i"),
          garage: new RegExp(`${garageQuery}`, "i"),
          basement: new RegExp(`${basementQuery}`, "i")
        });
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