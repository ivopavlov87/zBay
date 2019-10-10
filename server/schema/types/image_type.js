const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

const ImageType = new GraphQLObjectType({
  name: "ImageType",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    publicId: { type: GraphQLString }
  })
})

module.exports = ImageType;