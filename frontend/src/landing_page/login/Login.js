import React, { useState } from "react";
import axios from "axios";
import Toast from "../Toast";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://trade-vision-a71w.onrender.com/auth/login",
        form,
        { withCredentials: true }
      );

      if (data.success) {
        setToast({message:"Login successful! Redirecting...",type: "success" });
        setTimeout(()=>{
          window.location.href = `https://trade-vision-dashboard-shreya-yadav-projects.vercel.app?token=${data.token}`;// dashboard runs here ,redirect to dashboard after login
        },1500);
      } else {
        setToast({ message: data.message, type: "error" });
      }
    } catch (err) {
      console.log(err);
      setToast({ message: "Login failed. Please try again.", type: "error" });
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="container mt-5 p-5 border-bottom">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-4">
            <h1 className="fs-3 mb-3">Login to your account</h1>
            <p className="text-muted">
              Access your portfolio, orders, and real-time market data.
            </p>

            <div className="card p-4 shadow-sm mt-5">
              <h3 className="text-center mb-4">Log In</h3>

              <form onSubmit={handleSubmit}>
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
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
              </form>

              <p className="text-muted mt-3 text-center">
                Don't have an account?{" "}
                <a href="/signup">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;