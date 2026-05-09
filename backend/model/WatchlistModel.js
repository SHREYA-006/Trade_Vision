const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,
});

const WatchlistModel = mongoose.model("Watchlist", WatchlistSchema);
module.exports = { WatchlistModel };