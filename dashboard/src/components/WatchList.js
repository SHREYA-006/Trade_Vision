import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Tooltip, Grow } from "@mui/material";
import { BarChartOutlined, MoreHoriz } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";
import { DoughnutChart } from "./DoughnutChart";

const WatchList = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [search, setSearch] = useState("");
  const [livePrices, setLivePrices] = useState({});

  const fetchWatchlist = async () => {
    try {
      const res = await axios.get("http://localhost:3002/watchlist", {
        withCredentials: true,
      });
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
          `http://localhost:3002/stockprice/${stock.name}`,
          { withCredentials: true },
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
          "http://localhost:3002/watchlist/add",
          { name },
          { withCredentials: true },
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
    await axios.delete(`http://localhost:3002/watchlist/remove/${name}`, {
      withCredentials: true,
    });
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
          />
        ))}
      </ul>
      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock, livePrice, onRemove }) => {
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
        <WatchListActions uid={stock.name} onRemove={onRemove} />
      )}
    </li>
  );
};

const WatchListActions = ({ uid, onRemove }) => {
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
          <button className="action">
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
