import React from "react";

function Hero() {
  return (
    <div className="container mt-5 p-5">
      <div className="row text-center mt-5 p-5">
        <h1 className="fs-3 mb-3">Charges</h1>
        <h2 className="fs-5 text-muted">List of all charges and taxes</h2>
      </div>
      <div className="row text-center mt-5">
        <div className="col">
          <img src="images/pricing0.svg" style={{width:"60%"}}></img>
          <h3 className="mt-3 mb-3">Free equity delivery</h3>
          <p className="text-muted">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹
            0 brokerage.
          </p>
        </div>
        <div className="col">
          <img src="images/intradayTrades.svg" style={{width:"60%"}}></img>
          <h3 className="mt-3 mb-3">Intraday and F&O trades</h3>
          <p className="text-muted">
            Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>
        <div className="col">
          <img src="images/pricingMF.svg" style={{width:"60%"}}></img>
          <h3 className="mt-3 mb-3">Free direct MF</h3>
          <p className="text-muted">
            All direct mutual fund investments are absolutely free — ₹ 0
            commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
