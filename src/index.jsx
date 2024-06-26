import React from "react";
import ReactDOM from "react-dom/client";
import styles from "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App className={styles.app} />
  </React.StrictMode>,
);
