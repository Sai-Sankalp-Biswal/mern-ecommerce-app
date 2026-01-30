import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";          // ✅ IMPORT APP
import "./index.css";             // ✅ global styles
import "./styles.css";            // ✅ renamed styles file

const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
