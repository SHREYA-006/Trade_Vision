require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const AuthRoute = require("./routes/AuthRoute");
const HoldingsRoute = require("./routes/HoldingsRoute");
const OrdersRoute = require("./routes/OrdersRoute");
const PositionsRoute = require("./routes/PositionsRoute");
const WatchlistRoute = require("./routes/WatchlistRoute");
const StockRoute = require("./routes/StockRoute");

const PORT = process.env.PORT || 3002;
const URL = process.env.MONGO_URL;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://trade-vision-frontend-pied.vercel.app",
      "https://trade-vision-dashboard-shreya-yadav-projects.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", AuthRoute);
app.use("/", HoldingsRoute);
app.use("/", OrdersRoute);
app.use("/", PositionsRoute);
app.use("/", WatchlistRoute);
app.use("/", StockRoute);

app.post("/auth/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  res.json({ message: "Logged out successfully" });
});

mongoose
  .connect(URL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
