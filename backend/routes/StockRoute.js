const router = require("express").Router();
const { HoldingsModel } = require("../model/HoldingsModel");
const { userVerification } = require("../middlewares/AuthMiddleware");
const https = require("https");
const jwt = require("jsonwebtoken");

router.get("/stockprice/:symbol", (req, res) => {
  const symbol = req.params.symbol;
  const isIndex = symbol.startsWith("%5E") || symbol.startsWith("^");
  const url = isIndex
    ? `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`
    : `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}.NS`;

  https
    .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          const meta = parsed?.chart?.result?.[0]?.meta;
          if (meta) {
            res.json({
              price: meta.regularMarketPrice,
              dayHigh: meta.regularMarketDayHigh,
              dayLow: meta.regularMarketDayLow,
              fiftyTwoWeekHigh: meta.fiftyTwoWeekHigh,
              fiftyTwoWeekLow: meta.fiftyTwoWeekLow,
              volume: meta.regularMarketVolume,
              previousClose: meta.previousClose,
            });
          } else {
            res.status(404).json({ message: "Price not found" });
          }
        } catch (err) {
          res.status(500).json({ message: "Parse error" });
        }
      });
    })
    .on("error", (err) => {
      res.status(500).json({ message: err.message });
    });
});

router.get("/summary", userVerification, async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({ userId: req.user._id });

    if (holdings.length === 0) {
      return res.json({
        holdingsCount: 0,
        totalInvestment: "0.00",
        totalCurrentValue: "0.00",
        totalPnL: "0.00",
        totalPnLPercent: "0.00",
      });
    }

    const livePrices = {};
    for (const stock of holdings) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${stock.name}.NS`;
        const priceData = await new Promise((resolve) => {
          https
            .get(
              url,
              { headers: { "User-Agent": "Mozilla/5.0" } },
              (response) => {
                let data = "";
                response.on("data", (chunk) => (data += chunk));
                response.on("end", () => {
                  try {
                    const parsed = JSON.parse(data);
                    const price =
                      parsed?.chart?.result?.[0]?.meta?.regularMarketPrice;
                    resolve(price || null);
                  } catch {
                    resolve(null);
                  }
                });
              },
            )
            .on("error", () => resolve(null));
        });
        if (priceData) livePrices[stock.name] = priceData;
      } catch (err) {
        console.log(`Failed price for ${stock.name}`);
      }
    }

    const totalInvestment = holdings.reduce(
      (sum, stock) => sum + stock.avg * stock.qty,
      0,
    );
    const totalCurrentValue = holdings.reduce(
      (sum, stock) => sum + (livePrices[stock.name] || stock.price) * stock.qty,
      0,
    );
    const totalPnL = totalCurrentValue - totalInvestment;
    const totalPnLPercent =
      totalInvestment > 0
        ? ((totalPnL / totalInvestment) * 100).toFixed(2)
        : "0.00";

    res.json({
      holdingsCount: holdings.length,
      totalInvestment: totalInvestment.toFixed(2),
      totalCurrentValue: totalCurrentValue.toFixed(2),
      totalPnL: totalPnL.toFixed(2),
      totalPnLPercent,
    });
  } catch (err) {
    console.error("Summary error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
