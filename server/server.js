const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys.js").MONGO_URI;
const expressGraphQL = require("express-graphql");
const User = require("../server/models/User");
const Category = require("../server/models/Category");
// const Watchlist = require("../server/models/Watchlist");
const Home = require("../server/models/Home");
const Bid = require("../server/models/Bid");
const Image = require('../server/models/Image');
const schema = require("./schema/schema");
const cors = require("cors");
const app = express();
const images = require('./routes/images');

if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", images);

app.use(
  "/graphql", expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);

module.exports = app;