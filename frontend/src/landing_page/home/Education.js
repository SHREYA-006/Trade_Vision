import React from "react";

function Education() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col">
          <img src="images/education.svg"></img>
        </div>
        <div className="col mt-5">
          <h1 className="fs-3 mb-3">Free and open market education</h1>
          <p className="muted-text">
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            Varsity<i class="fa-solid fa-arrow-right"></i>
          </a>
          <p className="muted-text mt-4">
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="" style={{ textDecoration: "none" }}>
            Trading Q&A<i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
