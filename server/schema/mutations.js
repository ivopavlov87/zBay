const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLBoolean } = graphql;
const mongoose = require("mongoose");

const CategoryType = require('../schema/types/category_type')
const Category = mongoose.model("category");
const HomeType = require("../schema/types/home_type");
const Home = mongoose.model("home");
const UserType = require("../schema/types/user_type");
const User = mongoose.model("user");
const Bid = mongoose.model('bid');
const BidType = require("../schema/types/bid_type")

const AuthService = require("../services/auth")

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
        searchField,
        zipcode }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        // if our service returns true then our home is good to save!
        // anything else and we'll throw an error
        if (validUser.loggedIn) {
          return new Home({ name, 
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
            searchField,
            zipcode }).save();
        } else {
          throw new Error('Sorry, you need to be logged in to create a home.');
        }
      }
    }, 
    deleteHome: {
      type: HomeType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return Home.remove({ _id: id });
      }
    },
    updateHomeCategory: {
      type: HomeType,
      args: {
        homeId: { type: GraphQLID },
        categoryId: { type: GraphQLID },
      },
      resolve(parentValue, { homeId, categoryId }) {
        return Home.updateHomeCategory(homeId, categoryId)
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
      async resolve(_, args, ctx){
        const validUser = await AuthService.verifyUser({ token: ctx.token });
        if (validUser.loggedIn) {
          return new Bid({
            user: validUser.userId,
            home: args.homeId,
            amount: args.amount
          }).save().then(bid => {
            return Home.findById(args.homeId).then(home =>{
              home.bids.push(bid)
              return home.save().then(home => bid)
            })
          })
        } else {
          throw new Error("Sorry, you must be logged in to bid on a home.")
        }
      }
    }
  }
});

module.exports = mutation;