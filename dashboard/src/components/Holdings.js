import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [holdings, setHoldings] = useState([]);

  useEffect(() => {
    const fetchHoldings = async () => {
      const res = await axios.get("http://localhost:3002/allHoldings", {
        withCredentials: true,
      });
      const holdingsData = res.data;

      if (holdingsData.length === 0) {
        setHoldings([]);
        return;
      }

      // fetch prices one by one with delay
      const prices = {};
      for (const stock of holdingsData) {
        try {
          const priceRes = await axios.get(
            `http://localhost:3002/stockprice/${stock.name}`,
            { withCredentials: true },
          );
          if (priceRes.data.price) {
            prices[stock.name] = priceRes.data.price;
          }
        } catch (err) {
          console.log(`Failed for ${stock.name}`);
        }
      }

      const updatedHoldings = holdingsData.map((stock) => ({
        ...stock,
        price: prices[stock.name] ? Number(prices[stock.name]) : stock.price,
      }));
      setHoldings(updatedHoldings);
    };

    fetchHoldings();
    window.addEventListener("orderPlaced", fetchHoldings);
    return () => window.removeEventListener("orderPlaced", fetchHoldings);
  }, []);

  const totalInvestment = holdings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0,
  );
  const totalCurrentValue = holdings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0,
  );
  const totalPnL = totalCurrentValue - totalInvestment;
  const totalPnLPercent =
    totalInvestment > 0
      ? ((totalPnL / totalInvestment) * 100).toFixed(2)
      : "0.00";

  const labels = (holdings ?? []).map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: (holdings ?? []).map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((stock, index) => {
              const currValue = stock.price * stock.qty;
              const pnl = currValue - stock.avg * stock.qty;
              const isProfit = currValue - stock.avg * stock.qty >= 0.0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td> {stock.name} </td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td> {stock.price.toFixed(2)} </td>
                  <td>{currValue.toFixed(2)}</td>
                  <td className={profClass}>
                    {isProfit ? "+" : ""}
                    {pnl.toFixed(2)}
                  </td>
                  <td className={profClass}>{stock.net}</td>
                  <td className={dayClass}>{stock.day}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>₹{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>₹{totalCurrentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnL >= 0 ? "profit" : "loss"}>
            {totalPnL >= 0 ? "+" : ""}
            {totalPnL.toFixed(2)} ({totalPnLPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
