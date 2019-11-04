# zBay

 [zBay live](https://the-zbay.herokuapp.com/)

A group effort combination of eBay and Zillow; users are able to create auctions and bid on luxury homes.



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

<div><img src="https://github.com/ivopavlov87/zBay/blob/heroku-deployment/ModalGif.gif" alt="Demo login" /></div>

The backend is a Node.js runtime and Express framework used for processing requests and querying the application database. Using the Express framework allowed for quick setup with well tested and established design patterns along with well documented troubleshooting whenever any bugs happened to appear. The database was setup on MongoDB for user, home, and auction bidding data. The frontend is tied together using React, which kept the look and feel of the site ubiquitous. Apollo client was used for state managment, and to handle/manage client cache. GraphQL was used to query for complex relational data; replacing the traditional RESTful API into a single endpoint.

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

//....

module.exports = mongoose.model('user', UserSchema);
```

## Features

### User Homes

<div><img src="https://github.com/ivopavlov87/zBay/blob/master/UserHomesGif.gif" alt="Watchlist" /></div>

* Users are able to see all listings they have created and can browse all image uploads for each home utilising a carousel image slider and can delete any auctions that are no longer needed/wanted with the push of a button.

```javascript
<Query query={FETCH_USER_HOMES} variables={{ id: idPostSearch }}>
  {({ loading, error, data }) => {
    if (loading) return <Loading/>;
    if (error) return `Error! ${error.message}`;

    if (data.userHomes.length === 0){
      return (
        <div className="profile-container">
          <h1 className="profile-header">You haven't listed any homes for auction yet</h1>
          <h3>Click 'Create a Home' to list your home and view it here!</h3>
        </div>
      );
    } else {
      return (
        <div className="profile-container">
          <h1 className="profile-header">Your Homes</h1>
          <div className="user-ul-container">
            <ul className="profile-ul">
              {data.userHomes.map((hm, i) => {
                const imageSettings = {
                  infinite: true,
                  speed: 500,
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  className: "index-slider",
                  adaptiveHeight: true
                };

                let images;
                if (hm.images && hm.images.length > 0){
                    images = hm.images.map((image, i) => {
                    return <div key={i}><Image className='index-image-slide' cloudName={token2} publicId={image} /></div>
                    })
                  } else {
                    images = <div>`there are no images for {hm.name}`</div>
                  }

                let maybeTimer;
                if (hm.bids.length > 0) {
                  maybeTimer = <Timer date={hm.bids[0].date} />;
                }
                return <div className="profile-card" key={i}>
                  <Link key={hm._id} to={`/homes/${hm._id}`}>
                    <li>
                      <div className="profile-top">
                        {maybeTimer}
                        <div className="profile-slideshow">
                          <Slider {...imageSettings}>{images}</Slider>
                        </div>
                      </div>
                      <div className="profile-bottom">
                        <h2>{hm.name}</h2>
                        <h3>Click to See Listing</h3>
                      </div>
                    </li>
                  </Link>
                    <DeleteHome id={hm._id} />                        
                </div>
              })}
            </ul>
          </div>
        </div>
      );
    }
  }}
</Query>
```

### Watchlist

* Users are able to create a watchlist of homes they want to keep track of, and can access it anytime via the navigation bar.

<div><img src="https://github.com/ivopavlov87/zBay/blob/master/MapBidWatchlistGif.gif" alt="Watchlist" /></div>

```javascript
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
```

### Search

* Users can search the entire database of listings for specific keywords and types of homes.
* Search can also be done from landing splash page to show area or state with homes for sale and click on map markers to access auction listing.

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

## Future Updates
* Open up to countries outside USA
* Implement additional info for each home, examples include: walk-score, near by ammenities (highway access, malls, parks, etc.), last sold, and more
* Virtual tour of home
* Additional listings for renting properties vs. selling
* Payment/Mortage calculator; can you afford this home?