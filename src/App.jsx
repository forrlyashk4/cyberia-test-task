import React from "react";
import Header from "./components/Header/Header";
import BreadCrumbs from "./components/BreadСrumbs/BreadСrumbs";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <BreadCrumbs />
    </div>
  );
}

export default App;
