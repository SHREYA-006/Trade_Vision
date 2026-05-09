import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom fixed-top mb-5"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to={"/"}>
          <img src="images/logo.svg" alt="logo" style={{ width: "25%" }}></img>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left side nav links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={"/about"}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/products"}>Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/pricing"}>Pricing</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/support"}>Support</Link>
            </li>
          </ul>

          {/* Right side Login + Signup buttons */}
          <div className="d-flex align-items-center gap-2">
            <Link
              to={"/login"}
              className="btn btn-outline-primary"
              style={{ borderRadius: "20px", padding: "6px 20px", fontWeight: 500 }}
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="btn btn-primary"
              style={{ borderRadius: "20px", padding: "6px 20px", fontWeight: 500 }}
            >
              Sign Up →
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;