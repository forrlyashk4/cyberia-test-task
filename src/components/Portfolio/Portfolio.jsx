import React from "react";
import styles from "./Portfolio.module.scss";

export default function Portfolio() {
  return (
    <main>
      <h1 className={styles.portfolio__title}>Кейсы</h1>
      <div className={styles.portfolio__categoriesList}>
        <div className={styles.portfolio__category}>Продвижение</div>
        <div className={styles.portfolio__category}>Разработка</div>
        <div className={styles.portfolio__category}>Мобильные приложения</div>
        <div className={styles.portfolio__category}>Юзабилити - аудит</div>
      </div>
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
  );
}
