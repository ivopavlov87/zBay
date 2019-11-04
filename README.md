# zBay

 [zBay live](https://the-zbay.herokuapp.com/)

A group effort combination of eBay and Zillow; users are able to create auctions and bid on luxury homes.

<div><img src="https://github.com/ivopavlov87/zBay/blob/heroku-deployment/ModalGif.gif" alt="Demo login" /></div>

## Architecture and Technology


### Technologies used: 
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [Apollo](https://www.apollographql.com/)
* [GraphQL](https://graphql.org/)
* [Node.js](https://nodejs.org/)
* [Cloudinary API](https://cloudinary.com/)
* [Mapbox API](https://www.mapbox.com/)

<div><img src="https://github.com/ivopavlov87/zBay/blob/master/MapBidWatchlistGif.gif" alt="Watchlist" /></div>

The backend is a Node.js runtime and Express framework used for processing requests and querying the application database. Using the Express framework allowed for quick setup with well tested and established design patterns along with well documented troubleshooting whenever any bugs happened to appear. The database was setup on MongoDB for user, and home data. The frontend is tied together using React, which kept the look and feel of the site to remain universal. Apollo client was used for state managment, and handle/manage client cache. GraphQL was used to query for complex relational data; replacing the traditional RESTful API into a single endpoint.

```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 32
  },
  date: {
    type: Date,
    default: Date.now
  },
  watchlist: [{
    type: Schema.Types.ObjectId,
    ref: "home"
  }]
});

UserSchema.statics.addHomeToWatchlist = (userId, homeId) => {
  const User = mongoose.model("user");
  const Home = mongoose.model("home");
  

  return User.findById(userId).then(user => {
    
    return Home.findById(homeId).then(home => {
      
      if (user.watchlist.includes(home)){
        return 
      } else {
        user.watchlist.push(home)
        return user.save().then(user => user.watchlist)
      }
    })
  })
}

UserSchema.statics.removeHomeFromWatchlist = (userId, homeId) => {
  const User = mongoose.model("user");
  const Home = mongoose.model("home");

  return User.findById(userId).then(user => {
    return Home.findById(homeId).then(home => {
      if (user.watchlist.includes(home)) {
        user.watchlist.pull(home)
        return user.save().then(user => user.watchlist)
      } else {
        return;
      }
    })
  })
}

module.exports = mongoose.model('user', UserSchema);
```

## Features

### Search

* Users can search the entire database of listings for specific keywords and types of homes
* Search can be done from landing splash page to show area or state with homes for sale

<div><img src="https://github.com/ivopavlov87/zBay/blob/master/SplashSearchGif.gif" alt="Splash search" /></div>

```javascript
<ApolloConsumer>
  {(cache) => (
      <Query query={SEARCH_HOMES} 
        variables={{ searchQuery: this.state.searchQuery }}
        update={(cache, { data: { results }}) => {
          const data = cache.readQuery({ query: FETCH_RESULTS })
          data.results = [...data.results, ...results]
          cache.writeQuery({ query: FETCH_RESULTS, data })
        }}>
        {({ loading, error, data }) => {
          if (loading) return <div className="loading">Loading...</div>;
          if (error) return <p></p>;
  
          cache.cache.data.data.ROOT_QUERY.results.json = [];
          cache.cache.data.data.ROOT_QUERY.results.json.push(data.searchHomes);
  
          return ""
        }}
    </Query>
  )}
</ApolloConsumer>
```