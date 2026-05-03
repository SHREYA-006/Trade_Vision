import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3002/auth/signup",
        form,
        { withCredentials: true },
      );

      alert(data.message);
    } catch (err) {
      console.log(err);
      alert("Signup failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-5 p-5 border-bottom">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <h1 className="fs-3 mb-3">Open a Zerodha account</h1>
            <p className="text-muted">
              Modern platforms and apps, ₹0 investments, and flat ₹20 intraday
              and F&O trades.
            </p>

            <div className="card p-4 shadow-sm mt-5">
              <h3 className="text-center mb-4">Sign Up</h3>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
