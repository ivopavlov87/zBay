const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID } = graphql;
const mongoose = require("mongoose");

const CategoryType = require('../schema/types/category_type')
const Category = mongoose.model("category");
const HouseType = require("../schema/types/house_type");
const House = mongoose.model("house");
const UserType = require("../schema/types/user_type");
const User = mongoose.model("user");

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
    newHouse: {
      type: HouseType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        sqft: { type: GraphQLInt },
        bathrooms: { type: GraphQLFloat }
      },
      async resolve(_, { name, description, sqft, bathrooms }, ctx) {
        const validUser = await AuthService.verifyUser({ token: ctx.token });

        // if our service returns true then our house is good to save!
        // anything else and we'll throw an error
        if (validUser.loggedIn) {
          return new House({ name, description, sqft, bathrooms }).save();
        } else {
          throw new Error('Sorry, you need to be logged in to create a house.');
        }
      }
    }, 
    deleteHouse: {
      type: HouseType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, { id }) {
        return House.remove({ _id: id });
      }
    },
    updateHouseCategory: {
      type: HouseType,
      args: {
        houseId: { type: GraphQLID },
        categoryId: { type: GraphQLID },
      },
      resolve(parentValue, { houseId, categoryId }) {
        return House.updateHouseCategory(houseId, categoryId)
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
    }
  }
});

module.exports = mutation;