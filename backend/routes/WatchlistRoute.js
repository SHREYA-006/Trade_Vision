const router = require("express").Router();
const { WatchlistModel } = require("../model/WatchlistModel");
const { userVerification } = require("../middlewares/AuthMiddleware");
const jwt = require("jsonwebtoken");

router.get("/watchlist", userVerification, async (req, res) => {
  try {
    const watchlist = await WatchlistModel.find({ userId:req.user._id});
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/watchlist/add", userVerification, async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await WatchlistModel.findOne({ name, userId:req.user._id});
    if (existing) return res.json({ message: "Stock already in watchlist" });
    const newStock = new WatchlistModel({ name, userId: req.user._id });
    await newStock.save();
    res.json({ message: "Stock added to watchlist", success: true });
  } catch (err) {
    console.error("Watchlist add error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.delete("/watchlist/remove/:name", userVerification, async (req, res) => {
  try {
    await WatchlistModel.deleteOne({
      name: req.params.name,
      userId:req.user._id,
    });
    res.json({ message: "Stock removed", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
