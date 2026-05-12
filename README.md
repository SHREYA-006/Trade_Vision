# Trade Vision 📈

A full-stack stock trading platform built with React, Node.js, Express, and MongoDB. Trade Vision allows users to manage their stock portfolio, track live market prices, and simulate buy/sell orders.

---

## 🚀 Features

- **Authentication** — Secure signup/login with JWT tokens and bcrypt password hashing
- **Protected Routes** — Dashboard accessible only to authenticated users
- **Live Stock Prices** — Real-time NSE stock prices powered by Yahoo Finance
- **Live Market Indices** — Live NIFTY 50 and SENSEX in the dashboard topbar
- **Watchlist** — Add/remove stocks to a personalized watchlist with live prices
- **Stock Analytics** — View detailed stock info (Day High/Low, 52W High/Low, Volume)
- **Holdings** — Track your stock portfolio with real-time P&L calculation
- **Orders** — Complete history of all buy/sell orders
- **Positions** — Track closed trade positions
- **Buy/Sell Orders** — Simulate stock trading with weighted average price calculation
- **Per User Data** — Every user has completely isolated data
- **Toast Notifications** — Clean success/error messages throughout the app
- **Logout** — Secure session clearing with cookie cleanup

---

## 🛠️ Tech Stack

**Frontend (Landing Page)**
- React.js
- Bootstrap 5
- Axios
- React Router DOM

**Dashboard**
- React.js
- Material UI
- Axios
- Chart.js
- React Router DOM

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Cookie Parser
- CORS

**Database**
- MongoDB Atlas (Cloud)

**Stock Data**
- Yahoo Finance API (via backend proxy)

---

## 📁 Project Structure

```
ZERODHA_CLONE/
├── frontend/          # Landing page (port 3000)
│   └── src/
│       └── landing_page/
│           ├── Navbar.jsx
│           ├── login/
│           ├── signup/
│           ├── home/
│           ├── about/
│           ├── products/
│           ├── pricing/
│           └── support/
│
├── dashboard/         # Trading dashboard (port 3001)
│   └── src/
│       └── components/
│           ├── Home.js
│           ├── Dashboard.js
│           ├── TopBar.js
│           ├── Menu.js
│           ├── WatchList.js
│           ├── Holdings.js
│           ├── Orders.js
│           ├── Positions.js
│           ├── Summary.js
│           ├── BuyActionWindow.js
│           ├── SellActionWindow.js
│           └── ProtectedRoute.js
│
└── backend/           # REST API (port 3002)
    ├── index.js
    ├── model/
    │   ├── UserModel.js
    │   ├── HoldingsModel.js
    │   ├── OrdersModel.js
    │   ├── PositionsModel.js
    │   └── WatchlistModel.js
    ├── routes/
    │   ├── AuthRoute.js
    │   ├── HoldingsRoute.js
    │   ├── OrdersRoute.js
    │   ├── PositionsRoute.js
    │   ├── WatchlistRoute.js
    │   └── StockRoute.js
    ├── controllers/
    │   └── AuthController.js
    └── middlewares/
        └── AuthMiddleware.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v16+
- MongoDB Atlas account
- Git

### 1. Clone the repository
```bash
git clone https://github.com/SHREYA-006/Trade_Vision.git
cd Trade_Vision
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```
MONGO_URL=your_mongodb_atlas_connection_string
TOKEN_KEY=your_jwt_secret_key
PORT=3002
```

Start the backend:
```bash
nodemon index.js
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm start
```
Runs on `http://localhost:3000`

### 4. Setup Dashboard
```bash
cd dashboard
npm install
npm start
```
Runs on `http://localhost:3001`

---

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

| Variable | Description |
|----------|-------------|
| `MONGO_URL` | MongoDB Atlas connection string |
| `TOKEN_KEY` | Secret key for JWT token signing |
| `PORT` | Backend server port (default: 3002) |

---

## 📱 How It Works

1. User visits the landing page at `localhost:3000`
2. Signs up or logs in — JWT token stored in cookie
3. Automatically redirected to dashboard at `localhost:3001`
4. Dashboard is protected — unauthenticated users see Access Denied
5. Live stock prices fetched from Yahoo Finance via backend proxy
6. User can add stocks to watchlist, buy/sell stocks
7. Holdings and P&L update in real-time after every order
8. Each user's data is completely isolated

---

## 📊 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/auth/signup` | Register new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| GET | `/auth/verify` | Verify JWT token | ❌ |
| POST | `/auth/logout` | Logout user | ❌ |
| GET | `/allHoldings` | Get user holdings | ✅ |
| GET | `/allOrders` | Get user orders | ✅ |
| POST | `/newOrder` | Place buy/sell order | ✅ |
| GET | `/allPositions` | Get user positions | ✅ |
| GET | `/watchlist` | Get user watchlist | ✅ |
| POST | `/watchlist/add` | Add stock to watchlist | ✅ |
| DELETE | `/watchlist/remove/:name` | Remove from watchlist | ✅ |
| GET | `/stockprice/:symbol` | Get live stock price | ❌ |
| GET | `/summary` | Get portfolio summary | ✅ |

---

## 🎯 Key Implementation Details

- **Weighted Average Price** — When buying the same stock multiple times, the average cost is calculated using weighted average formula
- **Per User Isolation** — All models include `userId` field, all queries filter by logged-in user
- **Backend Proxy** — Yahoo Finance API called from backend to avoid CORS issues
- **Cookie Auth** — JWT stored in HTTP-only cookie for security
- **Real P&L** — P&L calculated using live market price vs average buy price

---

## 🙋‍♀️ Author

**Shreya Yadav**  
GitHub: [@SHREYA-006](https://github.com/SHREYA-006)

---

## 📄 License

This project is for educational purposes only. Not intended for real trading.
