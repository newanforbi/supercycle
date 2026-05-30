import React from "react";
import ReactDOM from "react-dom/client";
import LiquidityCascade from "./LiquidityCascade";

const styles = `
  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: #0A0B0F;
    color: #FFFFFF;
    font-family: 'DM Sans', sans-serif;
  }

  #root {
    width: 100%;
  }
`;

const styleEl = document.createElement('style');
styleEl.textContent = styles;
document.head.appendChild(styleEl);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LiquidityCascade />
  </React.StrictMode>
);
