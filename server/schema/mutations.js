const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLBoolean, GraphQLList } = graphql;
const mongoose = require("mongoose");

const CategoryType = require('../schema/types/category_type');
const Category = mongoose.model("category");

const HomeType = require("../schema/types/home_type");
const Home = mongoose.model("home");

const UserType = require("../schema/types/user_type");
const User = mongoose.model("user");

const BidType = require("../schema/types/bid_type");
const Bid = mongoose.model('bid');

const WatchlistType = require("../schema/types/watchlist_type");
const Watchlist = mongoose.model("watchlist")

const ImageType = require('./types/image_type');
const Image = mongoose.model('image');

const AuthService = require("../services/auth");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(parentValue, { name }) {
        return new Category({ name }).save();
      }
    },
    deleteCategory: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Category.remove({ _id: id });
      }
    },
    newHome: {
      type: HomeType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        streetAddress: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        yearBuilt: { type: GraphQLInt },
        sqft: { type: GraphQLInt },
        zipcode: { type: GraphQLInt },
        stories: { type: GraphQLInt },
        bedrooms: { type: GraphQLInt },
        bathrooms: { type: GraphQLFloat },
        garage: { type: GraphQLBoolean },
        basement: { type: GraphQLBoolean },
        images: { type: new GraphQLList(GraphQLString) },
        searchField: { type: GraphQLString }
      },
      async resolve(_, { name, 
        description,
        yearBuilt,
        sqft, 
        bathrooms, 
        bedrooms, 
        stories, 
        streetAddress, 
        city, 
        state,
        garage,
        basement,
        images,
        searchField,
        zipcode }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        // if our service returns true then our home is good to save!
        // anything else and we'll throw an error
        if (validUser.loggedIn) {
          return new Home({
            name,
            description,
            yearBuilt,
            sqft,
            bathrooms,
            bedrooms,
            stories,
            streetAddress,
            city,
            state,
            garage,
            basement,
            images,
            searchField,
            zipcode
          }).save();
        } else {
          throw new Error("Sorry, you need to be logged in to create a home.");
        }
      }
    },
    deleteHome: {
      type: HomeType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Home.findByIdAndRemove({ _id: id });
      }
    },
    updateHome: {
      type: HomeType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        streetAddress: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        yearBuilt: { type: GraphQLInt },
        sqft: { type: GraphQLInt },
        zipcode: { type: GraphQLInt },
        stories: { type: GraphQLInt },
        bedrooms: { type: GraphQLInt },
        bathrooms: { type: GraphQLFloat },
        garage: { type: GraphQLBoolean },
        basement: { type: GraphQLBoolean },
        searchField: { type: GraphQLString }
      },
      resolve(parentValue, { homeId, name, description, streetAddress, city, state, yearBuilt, sqft, zipcode, stories, bedrooms, bathrooms, garage, basement }) {
        const updateObj = {};
        updateObj.id = id;
        if (name) updateObj.name = name;
        if (description) updateObj.description = description;
        if (streetAddress) updateObj.streetAddress = streetAddress;
        if (city) updateObj.city = city;
        if (state) updateObj.state = state;
        if (yearBuilt) updateObj.yearBuilt = yearBuilt;
        if (sqft) updateObj.sqft = sqft;
        if (zipcode) updateObj.zipcode = zipcode;
        if (stories) updateObj.stories = stories;
        if (bedrooms) updateObj.bedrooms = bedrooms;
        if (bathrooms) updateObj.bathrooms = bathrooms;
        if (garage) updateObj.garage = garage;
        if (basement) updateObj.basement = basement;
        return Home.findOneAndUpdate({_id: id}, {$set: updateObj}, {new: true}, (err, home) => {
          return home;
        });
      }
    },
    createImage: {
      type: ImageType,
      args: {
        name: { type: GraphQLString },
        publicId: { type: GraphQLString },
        home: { type: GraphQLString }
      },
      resolve(_, { name, publicId, home }) {
        return new Image({ name, publicId, home }).save();
      }
    },
    register: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.register(args);
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        // all we need to log the user out is an id
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    createBid: {
      type: BidType,
      args: {
        // userId: { type: GraphQLID },
        homeId: { type: GraphQLID },
        amount: { type: GraphQLInt }
      },
      async resolve(_, args, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        if (validUser.loggedIn) {
          return new Bid({
            user: validUser._id,
            home: args.homeId,
            amount: args.amount
          })
            .save()
            .then(bid => {
              return Home.findById(args.homeId).then(home => {
                home.bids.push(bid);
                return home.save().then(home => bid);
              });
            });
        } else {
          throw new Error("Sorry, you must be logged in to bid on a home.");
        }
      }
    },
    createWatchlist: {
      type: WatchlistType,
      args: { userId: { type: GraphQLID }},
      async resolve(_, args, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        if (validUser.loggedIn) {
          return new Watchlist({
            user: args.userId
          }).save().then(watchlist => {
            return User.findById(args.userId).then(user => {
              console.log(args.userId)
              user.watchlist = watchlist
              return user.save()
            })
          }).then(watchlist => watchlist)
        }
      }
    },
    addHomeToWatchlist: {
      type: WatchlistType,
      args: {
        watchlistId: { type: GraphQLID },
        homeId: { type: GraphQLID }
      },
      resolve(_, { watchlistId, homeId }) {
        return Watchlist.addHome(watchlistId, homeId)
      }
    }
  }
});

module.exports = mutation;