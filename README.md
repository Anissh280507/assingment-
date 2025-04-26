🚀 Real-Time Crypto Price Tracker
A responsive React + Redux Toolkit application that tracks real-time cryptocurrency prices, simulating WebSocket updates.
Inspired by platforms like CoinMarketCap, the app displays asset data in a sleek, responsive table.

🎯 Features
📈 Live price updates every 1–2 seconds (simulated WebSocket).

🔥 Redux Toolkit for full state management.

📊 Responsive crypto table with:

Name & Symbol

Price

% Changes (1h, 24h, 7d) with color-coding (green/red)

Market Cap

24h Volume

Circulating & Max Supply

Static 7D mini chart

⚡ Optimized with Redux selectors to minimize re-renders.

🛠️ Tech Stack
React (Vite or CRA)

Redux Toolkit (RTK)

React-Redux

CSS (or Tailwind CSS if styled)

UUID (for unique IDs if needed)

Mocked WebSocket using setInterval

🚀 Getting Started
1. Clone the Repository
git clone https://github.com/your-username/crypto-price-tracker.git
cd crypto-price-tracker

📈 Simulated Real-Time Updates
Every 1–2 seconds, random changes are applied to:

Price

1h %, 24h %, 7d %

24h Volume

Updates are dispatched via Redux actions, ensuring no local state is used.

Color-coded performance:

🟢 Green for positive change

🔴 Red for negative change
https://github.com/user-attachments/assets/96089944-b82a-4718-902d-e41d3844bbaa
