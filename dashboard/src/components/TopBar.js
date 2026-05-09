import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from "./Menu";

const TopBar = () => {
  const [indices, setIndices] = useState({
    nifty: null,
    sensex: null,
  });

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const [niftyRes, sensexRes] = await Promise.all([
          axios.get("http://localhost:3002/stockprice/%5ENSEI"),  // NIFTY 50
          axios.get("http://localhost:3002/stockprice/%5EBSESN"), // SENSEX
        ]);
        setIndices({
          nifty: niftyRes.data.price,
          sensex: sensexRes.data.price,
        });
      } catch (err) {
        console.log("Failed to fetch indices");
      }
    };

    fetchIndices();
    const interval = setInterval(fetchIndices, 60000); // refresh every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">
            {indices.nifty ? indices.nifty.toFixed(2) : "..."}
          </p>
          <p className="percent"></p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">
            {indices.sensex ? indices.sensex.toFixed(2) : "..."}
          </p>
          <p className="percent"></p>
        </div>
      </div>
      <Menu />
    </div>
  );
};

export default TopBar;