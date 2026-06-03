import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import { DoughnutChart } from "./DoughnutChart";

const getAuthHeader=()=>{
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState("");
  const [livePrices, setLivePrices] = useState({});
  const [selectedStock, setSelectedStock] = useState(null);

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get("https://trade-vision-a71w.onrender.com/watchlist", getAuthHeader());
      setWatchlist(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  // fetching one stock price at a time with delay to avoid API limit
  const fetchAllPricesOneByOne = async (stocks) => {
    for (const stock of stocks) {
      try {
        const res = await axios.get(
          `https://trade-vision-a71w.onrender.com/stockprice/${stock.name}`,
          getAuthHeader(),
        );
        if (res.data.price) {
          setLivePrices((prev) => ({ ...prev, [stock.name]: res.data.price }));
        } else {
          setLivePrices((prev) => ({ ...prev, [stock.name]: "N/A" }));
        }
      } catch (err) {
        console.log(`Failed for ${stock.name}`);
        setLivePrices((prev) => ({ ...prev, [stock.name]: "N/A" }));
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      const stocks = await fetchWatchlist();
      if (stocks.length > 0) {
        fetchAllPricesOneByOne(stocks);
      }
    };
    init();
  }, []);

  const handleAddStock = async () => {
    if (!search.trim()) return;
    const stockNames = search
      .split(",")
      .map((s) => s.trim().toUpperCase())
      .filter((s) => s);
    try {
      for (const name of stockNames) {
        await axios.post(
          "https://trade-vision-a71w.onrender.com/watchlist/add",
          { name },
          getAuthHeader(),
        );
      }
      setSearch("");
      const updatedStocks = await fetchWatchlist();
      // only fetching prices for newly added stocks
      const newStocks = updatedStocks.filter((s) => !livePrices[s.name]);
      if (newStocks.length > 0) fetchAllPricesOneByOne(newStocks);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveStock = async (name) => {
    await axios.delete(`https://trade-vision-a71w.onrender.com/watchlist/remove/${name}`,getAuthHeader());
    setLivePrices((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
    fetchWatchlist();
  };

  const data = {
    labels: watchlist.map((s) => s.name),
    datasets: [
      {
        label: "Price",
        data: watchlist.map((s) => livePrices[s.name] || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Add stocks eg: INFY, TCS (press Enter)"
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddStock()}
          style={{ color: "#555555" }}
        />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => (
          <WatchListItem
            stock={stock}
            key={index}
            livePrice={livePrices[stock.name]}
            onRemove={handleRemoveStock}
            onAnalytics={(name)=>setSelectedStock(name)} 
          />
        ))}
      </ul>
      <DoughnutChart data={data} />

      {selectedStock && (
        <StockInfoPopup
          symbol={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock,livePrice,onRemove,onAnalytics }) => {
  const [showWatchList, setShowWatchList] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchList(true)}
      onMouseLeave={() => setShowWatchList(false)}
    >
      <div className="item">
        <p className="up">{stock.name}</p>
        <div className="itemInfo">
          <span className="price">
            {livePrice === "N/A" ? (
              <span style={{ color: "#ff4d4d", fontSize: "11px" }}>
                Unavailable
              </span>
            ) : livePrice ? (
              `₹${livePrice.toFixed(2)}`
            ) : (
              "⏳"
            )}
          </span>
        </div>
      </div>
      {showWatchList && (
        <WatchListActions uid={stock.name} onRemove={onRemove} onAnalytics={onAnalytics} />
      )}
    </li>
  );
};

const WatchListActions = ({ uid,onRemove,onAnalytics  }) => {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);
  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy(B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="buy" onClick={() => openBuyWindow(uid)}>
            Buy
          </button>
        </Tooltip>

        <Tooltip
          title="Sell(S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="sell" onClick={() => openSellWindow(uid)}>
            Sell
          </button>
        </Tooltip>

        <Tooltip
          title="Analytics"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action" onClick={() => onAnalytics(uid)}>
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip
          title="Remove"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action" onClick={() => onRemove(uid)}>
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

const StockInfoPopup = ({ symbol, onClose }) => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://trade-vision-a71w.onrender.com/stockprice/${symbol}`,getAuthHeader())
      .then((res) => {
        setInfo(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [symbol]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          minWidth: "300px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h4 style={{ margin: 0, fontWeight: 700 }}>{symbol}</h4>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#888",
            }}
          >
            ✕
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: "center", color: "#888" }}>Loading...</p>
        ) : info ? (
          <>
            <h2 style={{ margin: "0 0 16px", color: "#1a73e8" }}>
              ₹{info.price?.toFixed(2)}
            </h2>
            <hr style={{ margin: "12px 0" }} />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                  Day High
                </p>
                <p style={{ margin: 0, fontWeight: 600, color: "#2e7d32" }}>
                  ₹{info.dayHigh?.toFixed(2)}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                  Day Low
                </p>
                <p style={{ margin: 0, fontWeight: 600, color: "#c62828" }}>
                  ₹{info.dayLow?.toFixed(2)}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                  52W High
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  ₹{info.fiftyTwoWeekHigh?.toFixed(2)}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                  52W Low
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  ₹{info.fiftyTwoWeekLow?.toFixed(2)}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                  Prev Close
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  ₹{info.previousClose?.toFixed(2)}
                </p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                  Volume
                </p>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {info.volume ? (info.volume / 1000000).toFixed(2) + "M" : "—"}
                </p>
              </div>
            </div>
          </>
        ) : (
          <p style={{ color: "#ff4d4d" }}>Data unavailable for this stock</p>
        )}
      </div>
    </div>
  );
};
