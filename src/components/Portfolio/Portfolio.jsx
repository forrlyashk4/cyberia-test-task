import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Portfolio.module.scss";

function Categories({ activeTab, setActiveTab }) {
  const [categoriesList, setCategoriesList] = useState(
    JSON.parse(sessionStorage.getItem("categories")) || [],
  );

  useEffect(() => {
    fetch("https://api.test.cyberia.studio/api/v1/project-categories")
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem("categories", JSON.stringify(data.items));
        setCategoriesList(data.items);
      })
      .catch((/* err */) => {
        // console.error("error", err);
        setCategoriesList([]);
      });
  }, []);

  const handleClick = (e) => {
    if (Number(e.target.id) === activeTab) {
      setActiveTab(0);
    } else {
      setActiveTab(Number(e.target.id));
    }
  };

  return (
    <div className={styles.portfolio__categoriesList}>
      {categoriesList.map((categoryData) => (
        <button
          type="button"
          key={categoryData.id}
          onClick={handleClick}
          className={
            activeTab === Number(categoryData.id)
              ? `${styles.portfolio__category} ${styles.portfolio__category_active}`
              : styles.portfolio__category
          }
          id={categoryData.id}
        >
          {categoryData.name}
        </button>
      ))}
    </div>
  );
}

Categories.propTypes = {
  activeTab: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

function PortfolioCards({ activeTab }) {
  const [cardsList, setCardsList] = useState(
    JSON.parse(sessionStorage.getItem("cards")) || [],
  );

  useEffect(() => {
    fetch("https://api.test.cyberia.studio/api/v1/projects")
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem("cards", JSON.stringify(data.items));
        setCardsList(data.items);
      })
      .catch((/* err */) => {
        // console.error("error", err);
        setCardsList([]);
      });
  }, []);

  function filtration(cardsData) {
    if (activeTab !== 0) {
      return cardsData.filter(
        (cardData) => cardData.categories[0].id === activeTab,
      );
    }
    return cardsData;
  }

  return (
    <div className={styles.caseList}>
      {filtration(cardsList).map((cardData) => (
        <div
          className={styles.case}
          style={{
            backgroundImage: `url(${cardData.image})`,
          }}
          key={cardData.title}
        >
          <div>
            <span>{cardData.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

PortfolioCards.propTypes = {
  activeTab: PropTypes.number.isRequired,
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="container">
      <main>
        <h1 className={styles.portfolio__title}>Кейсы</h1>
        <Categories activeTab={activeTab} setActiveTab={setActiveTab} />
        <PortfolioCards activeTab={activeTab} />
      </main>
    </div>
  );
}
