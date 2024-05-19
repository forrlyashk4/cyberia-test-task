import React, { useState, useEffect } from "react";
import styles from "./Portfolio.module.scss";

function Categories() {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    fetch("https://api.test.cyberia.studio/api/v1/project-categories")
      .then((res) => res.json())
      .then((data) => setCategoriesList(data.items))
      .catch((/* err */) => {
        // console.error("error", err);
        setCategoriesList([]);
      });
  }, []);

  return (
    <div className={styles.portfolio__categoriesList}>
      {categoriesList.map((categoryData) => (
        <div key={categoryData.id} className={styles.portfolio__category}>
          {categoryData.name}
        </div>
      ))}
    </div>
  );
}

function PortfolioCards() {
  const [cardsList, setCardsList] = useState([]);

  useEffect(() => {
    fetch("https://api.test.cyberia.studio/api/v1/projects")
      .then((res) => res.json())
      .then((data) => setCardsList(data.items))
      .catch((/* err */) => {
        // console.error("error", err);
        setCardsList([]);
      });
  }, []);

  return (
    <div className={styles.caseList}>
      {cardsList.map((cardData) => (
        <div
          className={styles.case}
          style={{
            background: `url(${cardData.image})`,
          }}
        >
          <div>
            <span>{cardData.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Portfolio() {
  return (
    <div className="container">
      <main>
        <h1 className={styles.portfolio__title}>Кейсы</h1>
        <Categories />
        <PortfolioCards />
      </main>
    </div>
  );
}
