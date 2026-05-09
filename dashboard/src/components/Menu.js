import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:3002/auth/logout",
      {},
      { withCredentials: true },
    );
    window.location.href = "http://localhost:3000/login";
  };

  useEffect(() => {
    axios
      .get("http://localhost:3002/auth/verify", { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          setUser(res.data.user);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />

        <div style={{ position: "relative" }}>
          <div
            className="profile"
            onClick={handleProfileClick}
            style={{ cursor: "pointer" }}
          >
            <div className="avatar">
              {user?.username ? user.username.slice(0, 2).toUpperCase() : "?"}
            </div>
            <p className="username">{user ? user.username : "Loading..."}</p>
          </div>

          {isProfileDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                zIndex: 1000,
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "8px 0",
                minWidth: "180px",
              }}
            >
              <div
                style={{
                  padding: "10px 16px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <p style={{ margin: 0, fontWeight: 600, fontSize: "14px" }}>
                  {user?.username}
                </p>
                <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                  {user?.email}
                </p>
              </div>

              <div
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#333",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                👤 My Profile
              </div>

              <div
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#333",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f5f5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                ⚙️ Settings
              </div>

              <div
                style={{
                  borderTop: "1px solid #f0f0f0",
                  padding: "8px 16px",
                  cursor: "pointer",
                  fontSize: "13px",
                  color: "#ff4d4d",
                }}
                onClick={handleLogout}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#fff5f5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
