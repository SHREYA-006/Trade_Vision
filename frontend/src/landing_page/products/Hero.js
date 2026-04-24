import React from "react";

function Hero() {
  return (
    <div className="container mt-5 p-5 border-bottom">
      <div className="row mt-5 text-center">
        <h1 className="fs-3 p-2">Zerodha Products</h1>
        <h2 className="fs-5 text-muted p-2">
          Sleek, modern, and intuitive trading platforms
        </h2>
        <p className="p-2">
          Check out our{" "}
          <a href="" style={{ textDecoration: "none" }}>
            investment offerings <i class="fa-solid fa-arrow-right"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
