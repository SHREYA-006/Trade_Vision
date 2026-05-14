import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const handleSellClick = async () => {
    try {
      const res = await axios.post(
        "https://trade-vision-a71w.onrender.com/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity), // ← convert string to number
          price: Number(stockPrice), // ← convert string to number
          mode: "SELL",
        },
        { withCredentials: true },
      );

      if (res.status === 400) {
        alert(res.data.message); // ← show "Stock not in holdings"
      }

      alert("✅ Sell order placed successfully!"); // ← success message
      window.dispatchEvent(new Event("orderPlaced")); // ← trigger refresh
      
      GeneralContext.closeSellWindow();
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message); // ← shows the actual error
      }
    }
  };

  const handleCancelClick = () => {
    GeneralContext.closeSellWindow();
  };

  return (
    <div className="containerClass" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              id="qty"
              name="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Margin required ₹140.65</span>
        <div>
          <Link className="btn btn-red" onClick={handleSellClick}>
            Sell
          </Link>
          <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
