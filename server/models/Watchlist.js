// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;


// const WatchlistSchema = new Schema({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: "user"
//     },
//     homes: [{
//         type: Schema.Types.ObjectId,
//         ref: "home"
//     }]
// });

// WatchlistSchema.statics.addHome = (watchlistId, homeId) => {
//     const Watchlist = mongoose.model("watchlist")
//     const Home = mongoose.model("home");

//     return Watchlist.findById(watchlistId).then(watchlist => {
//         const watchedHome = Home.findById(homeId)
//         watchlist.homes.push(watchedHome);
//         return watchlist.save().then(watchlist => watchlist)
//     })
// }

// module.exports = mongoose.model("watchlist", WatchlistSchema);