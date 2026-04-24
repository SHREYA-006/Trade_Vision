import React from "react";
function Team() {
  return (
    <div className="container">
      <div className="row text-center mb-5">
        <h1 className="mb-3 fs-3">People</h1>
      </div>
      <div className="row">
        <div className="col-6 text-center">
          <img
            src="images/nithinKamath.jpg"
            alt="Nithin Kamath"
            style={{ borderRadius: "50%", width: "50%", marginBottom: "1.8em" }}
          ></img>
          <h5>Nithin Kamath</h5>
          <p>Founder,CEO</p>
        </div>
        <div
          className="col-4 text-muted mt-4 "
          style={{ lineHeight: "1.6", fontSize: "1em" }}
        >
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader. Today,
            Zerodha has changed the landscape of the Indian broking industry.
          </p>
          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>
          <p>Playing basketball is his zen.</p>
          <p>
            Connect on{" "}
            <a href="" style={{ textDecoration: "None" }}>
              Homepage
            </a>{" "}
            /{" "}
            <a href="" style={{ textDecoration: "None" }}>
              TradingQnA
            </a>{" "}
            /{" "}
            <a href="" style={{ textDecoration: "None" }}>
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
