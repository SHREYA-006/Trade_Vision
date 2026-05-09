const router = require("express").Router();
const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { PositionsModel } = require("../model/PositionsModel");
const { userVerification } = require("../middlewares/AuthMiddleware");
const jwt = require("jsonwebtoken");

router.get("/allOrders",userVerification,async(req,res)=>{
  try{
    let allOrders = await OrdersModel.find({ userId:req.user._id});
    res.json(allOrders);
  }catch(err){
    res.status(500).json({ message: "Error fetching orders"});
  }
});

router.post("/newOrder", userVerification, async (req, res) => {
  const { name, qty, price, mode } = req.body;

  const userId=req.user._id;
  try {
    let newOrder = new OrdersModel({ name, qty, price, mode, userId });
    await newOrder.save();

    if (mode === "BUY") {
      const existingHolding = await HoldingsModel.findOne({ name, userId });
      if (existingHolding) {
        const totalQty = existingHolding.qty + qty;
        const newAvg = (existingHolding.avg * existingHolding.qty + price * qty) / totalQty;
        existingHolding.qty = totalQty;
        existingHolding.avg = parseFloat(newAvg.toFixed(2));
        existingHolding.price = price;
        await existingHolding.save();
      } else {
        const newHolding = new HoldingsModel({
          name, qty, avg: price, price,
          net: "0.00%", day: "0.00%", userId,
        });
        await newHolding.save();
      }
    }

    if (mode === "SELL") {
      const existingHolding = await HoldingsModel.findOne({ name, userId });
      if (!existingHolding) {
        return res.status(400).json({ message: "Stock not in holdings" });
      }
      if (existingHolding.qty < qty) {
        return res.status(400).json({ message: "Insufficient quantity" });
      }

      const buyAvg = existingHolding.avg;
      const pnl = (price - buyAvg) * qty;
      const pnlPercent = (((price - buyAvg) / buyAvg) * 100).toFixed(2);

      if (existingHolding.qty === Number(qty)) {
        await HoldingsModel.deleteOne({ name, userId });
      } else {
        existingHolding.qty -= qty;
        await existingHolding.save();
      }

      const existingPosition = await PositionsModel.findOne({ name, userId });
      if (existingPosition) {
        existingPosition.qty += qty;
        existingPosition.day = `${pnl >= 0 ? "+" : ""}${pnlPercent}%`;
        existingPosition.isLoss = pnl < 0;
        await existingPosition.save();
      } else {
        const newPosition = new PositionsModel({
          product: "CNC", name, qty, avg: buyAvg, price,
          net: `${pnl >= 0 ? "+" : ""}${pnlPercent}%`,
          day: `${pnl >= 0 ? "+" : ""}${pnlPercent}%`,
          isLoss: pnl < 0, userId,
        });
        await newPosition.save();
      }
    }

    res.send("Order saved");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;