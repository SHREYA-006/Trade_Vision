const router = require("express").Router();
const { HoldingsModel } = require("../model/HoldingsModel");
const { userVerification } = require("../middlewares/AuthMiddleware");

router.get("/allHoldings", userVerification, async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({ userId:req.user._id});
    res.json(allHoldings);
  } catch (err) {
    console.error("allHoldings error:", err.message);
    res.status(500).json({ message: "Error fetching holdings" });
  }
});

module.exports = router;
