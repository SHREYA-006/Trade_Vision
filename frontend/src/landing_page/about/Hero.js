import React from "react";

function Hero() {
  return (
    <div className="container mt-5 p-5">
      <div className="row p-5 border-bottom">
        <h1 className="text-center fs-4 mb-5">
          I built a modern stock trading platform powered by technology.
          <br></br>
        </h1>
      </div>
      <div
        className="row  p-5 text-muted fs-6"
        style={{ lineHeight: "1.8", fontSize: "1.2em" }}
      >
        <div className="col p-5 fs-10">
          <p>
            Trade Vision is a full-stack stock trading platform built to
            simulate the real-world experience of stock trading in India.
            Inspired by platforms like Zerodha, it brings together live market
            data, portfolio management, and seamless order execution in one
            place.
          </p>
          <p>
            I built Trade Vision using modern web technologies including
            React.js for the frontend, Node.js and Express.js for the backend,
            and MongoDB Atlas for cloud database.
          </p>
          <p>
            Live NSE stock prices are fetched in real-time using Yahoo Finance
            API, giving users an authentic trading experience with real market
            data.
          </p>
        </div>
        <div className="col p-5">
          <p>
            The platform supports complete user authentication with JWT tokens,
            protected routes, and per-user data isolation — every user has their
            own portfolio, watchlist, holdings, and order history.
          </p>
          <p>
            Users can buy and sell stocks, track their portfolio P&L in
            real-time, manage a personalized watchlist, and view live market
            analytics for any NSE listed stock.
          </p>
          <p>
            ⚠️ Disclaimer: Trade Vision is an educational project built to
            demonstrate full-stack development skills. It is not intended for
            real trading or investment purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
