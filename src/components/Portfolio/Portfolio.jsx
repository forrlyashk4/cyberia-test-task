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
      {categoriesList.map((category) => (
        <div key={category.id} className={styles.portfolio__category}>
          {category.name}
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
        <div className={styles.caseList}>
          <div className={styles.case}>
            <div>
              <span>Foodzo</span>
            </div>
          </div>
          <div className={styles.case}>
            <div>
              <span>Foodzo</span>
            </div>
          </div>
          <div className={styles.case}>
            <div>
              <span>Foodzo</span>
            </div>
          </div>
          <div className={styles.case}>
            <div>
              <span>Foodzo</span>
            </div>
          </div>
          <div className={styles.case}>
            <div>
              <span>Foodzo</span>
            </div>
          </div>
          <div className={styles.case}>
            <div>
              <span>Foodzo</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
