import React from "react";
import Header from "./components/Header/Header";
import BreadCrumbs from "./components/BreadСrumbs/BreadСrumbs";
import Portfolio from "./components/Portfolio/Portfolio";
import Feedback from "./components/Feedback/Feedback";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <BreadCrumbs />
      <Portfolio />
      <Feedback />
      <Footer />
    </>
  );
}

export default App;
