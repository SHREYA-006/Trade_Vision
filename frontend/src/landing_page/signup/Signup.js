import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import Toast from "../Toast";

function Signup() {
  const [toast, setToast] = useState(null);
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
        "https://trade-vision-a71w.onrender.com/auth/signup",
        form,
        { withCredentials: true },
      );
      if (data.success) {
        await axios.post(
          "https://trade-vision-a71w.onrender.com/auth/logout",
          {},
          { withCredentials: true },
        );

        const loginRes = await axios.post(
          "https://trade-vision-a71w.onrender.com/auth/login",
          { email: form.email, password: form.password },
          { withCredentials: true },
        );

        if (loginRes.data.success) {
          setToast({
            message: "Account created successfully! Redirecting...",
            type: "success",
          });
          setTimeout(() => {
            window.location.href = `https://trade-vision-dashboard-shreya-yadav-projects.vercel.app?token=${loginRes.data.token}`; // ← redirect to dashboard
          }, 1500);
        }
      } else {
        setToast({ message: data.message, type: "error" }); // shows "User already exists" etc.
      }
    } catch (err) {
      console.log(err);
      setToast({ message: "Signup failed. Please try again.", type: "error" });
    }
  };

  return (
    <>
      <Navbar />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="container mt-5 p-5 border-bottom">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <h1 className="fs-3 mb-3">Open a Trade Vision account</h1>
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
