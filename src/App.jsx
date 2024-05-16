import React from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import BreadCrumbs from "./components/BreadСrumbs/BreadСrumbs";
import Portfolio from "./components/Portfolio/Portfolio";
import Feedback from "./components/Feedback/Feedback";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <BreadCrumbs />
      <Portfolio />
      <Feedback />
    </div>
  );
}

export default App;
