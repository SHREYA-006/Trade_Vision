// dashboard/src/components/Orders.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/allOrders").then((res) => {
      console.log(res.data);
      setOrders(res.data);
    });
  }, []);

  return (
    <>
      <h3 className="title">Orders ({orders.length})</h3>

      {orders.length === 0 ? (
        <p style={{ color: "#999", padding: "20px 0" }}>
          You haven't placed any orders today.
        </p>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Price</th>
                <th>Mode</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => {
                const isBuy = order.mode === "BUY";
                return (
                  <tr key={index}>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>₹{order.price.toFixed(2)}</td>
                    <td>
                      <span
                        style={{
                          color: isBuy ? "#1a73e8" : "#e53935",
                          fontWeight: 600,
                        }}
                      >
                        {order.mode}
                      </span>
                    </td>
                    <td>
                      {order.date
                        ? new Date(order.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;