import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();
  return (
    <div className="container p-5 ml-5 mr-5">
      <div className="row text-center">
        <h3 className="mb-5 mt-5 text-muted fs-5">
          Want to know more about our technology stack? Check out the
          Zerodha.tech blog.
        </h3>
        <h3 className="mt-5 mb-3">The Zerodha Universe</h3>
        <p>
          Extend your trading and investment experience even further with our
          partner platforms
        </p>
      </div>
      <div className="row text-center mt-5">
        <div className="col-4 p-3">
          <img src="images/zerodhaFundhouse.png" style={{ width: "50%" }}></img>
          <p className="text-small text-muted p-4">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
        <div className="col-4 p-3">
          <img src="images/sensibullLogo.svg" style={{ width: "15em" }}></img>
          <p className="text-small text-muted p-4">
            Options trading platform that lets you create strategies, analyze
            positions, and examine data points like open interest, FII/DII, and
            more.
          </p>
        </div>
        <div className="col-4 p-3">
          <img src="images/dittoLogo.png" style={{ width: "30%" }}></img>
          <p className="text-small text-muted p-4">
            Personalized advice on life and health insurance. No spam and no
            mis-selling. Sign up for free
          </p>
        </div>
      </div>
      <div className="row text-center">
        <div className="col-4 p-3">
          <img src="images/streakLogo.png" style={{ width: "45%" }}></img>
          <p className="text-small text-muted p-4">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col-4 p-3">
          <img src="images/smallcaseLogo.png"></img>
          <p className="text-small text-muted p-4">
            Thematic investing platform that helps you invest in diversified
            baskets of stocks on ETFs.
          </p>
        </div>
        <div className="col-4 p-3">
          <img src="images/goldenpiLogo.png"></img>
          <p className="text-small text-muted p-4">Bonds trading platform</p>
        </div>
      </div>
      <div className="row text-center">
        <button
          className="btn btn-primary fs-5 "
          style={{ width: "17%", margin: "0 auto" }}
          onClick={() => navigate("/signup")}
        >
          Sign up for free
        </button>
      </div>
    </div>
  );
}

export default Universe;
