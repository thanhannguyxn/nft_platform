// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './frontend/App';
import reportWebVitals from './frontend/reportWebVitals';
import { WalletProvider } from './frontend/WalletContext'; // Import WalletProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
);

reportWebVitals();