const router = require("express").Router();
const { PositionsModel } = require("../model/PositionsModel");
const { userVerification } = require("../middlewares/AuthMiddleware");

router.get("/allPositions", userVerification, async (req, res) => {
  try{
    let allPositions = await PositionsModel.find({ userId:req.user._id});
    res.json(allPositions);
  }catch (err) {
    res.status(500).json({ message: "Error fetching positions" });
  }
});

module.exports = router;