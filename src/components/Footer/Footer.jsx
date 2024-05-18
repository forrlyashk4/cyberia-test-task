import React from "react";
import styles from "./Footer.module.scss";
import logotype from "../../assets/icons/cyberia-logo.svg";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div>
          <img src={logotype} alt="Cyberia logotype" />
          <p>Веб-разработка и усиление IT-команд</p>
        </div>
        <div className={styles.footer_links}>
          <a href="+79991234567">+7 999 123 45 67</a>
          <a href="mailto:hello@cyberia.studio">hello@cyberia.studio</a>
          <span>ул.Ярных, д.35, оф.10</span>
          <a href="./">Агентство</a>
          <a href="./">Услуги</a>
          <a href="./">Кейсы</a>
          <a href="./">Блок</a>
          <a href="./">Контакты</a>
        </div>
      </div>
    </footer>
  );
}
