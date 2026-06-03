import React, { useState, useEffect } from "react";
import axios from "axios";

const getAuthHeader=()=>{
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

const Summary = () => {
  const [summary, setSummary] = useState(null);
  const [user, setUser] = useState(null);

  // replace your useEffect with this:
  useEffect(() => {
    const fetchSummary = () => {
      axios
        .get("https://trade-vision-a71w.onrender.com/summary", getAuthHeader())
        .then((res) => {
          setSummary(res.data);
        });
    };

    fetchSummary(); //fetch on mount

    window.addEventListener("orderPlaced", fetchSummary); //re-fetch on order
    return () => window.removeEventListener("orderPlaced", fetchSummary); //cleanup
  }, []);

  useEffect(() => {
    axios
      .get("https://trade-vision-a71w.onrender.com/auth/verify", getAuthHeader(),)
      .then((res) => {
        if (res.data.status) {
          setUser(res.data.user);
        }
      })
      .catch(() => console.log("Auth check failed"));
  }, []);

  // Helper: converts raw number to "k" format — e.g. 31430 → "31.43k"
  const formatK = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return "0";
    if (Math.abs(num) >= 1000) return (num / 1000).toFixed(2) + "k";
    return num.toFixed(2);
  };

  const isProfit = summary && parseFloat(summary.totalPnL) >= 0;

  return (
    <>
      <div className="username">
        <h6>Hi, {user ? user.username : "User"}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{summary ? formatK(summary.totalCurrentValue) : "—"}</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance{" "}
              <span>{summary ? formatK(summary.totalInvestment) : "—"}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({summary ? summary.holdingsCount : "—"})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {summary ? formatK(summary.totalPnL) : "—"}{" "}
              <small>
                {summary
                  ? `${isProfit ? "+" : ""}${summary.totalPnLPercent}%`
                  : ""}
              </small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value{" "}
              <span>{summary ? formatK(summary.totalCurrentValue) : "—"}</span>
            </p>
            <p>
              Investment{" "}
              <span>{summary ? formatK(summary.totalInvestment) : "—"}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
