import React, { useState, useEffect, useRef } from "react";
import logo from "../../assets/icons/cyberia-logo.svg";
import style from "./Header.module.scss";

const headerLinksArr = [
  {
    name: "Агентство",
    path: "#",
  },
  {
    name: "Услуги",
    path: "#",
  },
  {
    name: "Кейсы",
    path: "#",
  },
  {
    name: "Блог",
    path: "#",
  },
  {
    name: "Контакты",
    path: "#",
  },
];

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const menu = useRef(null);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    if (isActive) {
      menu.current.style.display = "block";
      setTimeout(() => {
        menu.current.style.left = "0vw";
      }, 0);
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
      menu.current.style.left = "100vw";
      setTimeout(() => {
        menu.current.style.display = "none";
      }, 750);
    }
  }, [isActive]);

  const handleBurgerOpening = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="container">
      <header>
        <a href="./">
          <img src={logo} alt="Cyberia Logo" className={style.img} />
        </a>
        <div className={style.header__list}>
          {headerLinksArr.map((linkData) => (
            <a href={linkData.path} key={linkData.name}>
              {linkData.name}
            </a>
          ))}
        </div>
        <div
          role="button"
          aria-label="Меню"
          tabIndex="0"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleBurgerOpening();
            }
          }}
          className={`${style.header__burger} ${isActive ? style.active : ""}`}
          onClick={handleBurgerOpening}
        >
          <span />
          <span />
          <span />
        </div>
      </header>
      <div
        className={`${style.header__list_mobile} ${isActive ? style.header__list_mobile_active : ""}`}
        ref={menu}
      >
        {headerLinksArr.map((linkData) => (
          <a href={linkData.path} key={linkData.name}>
            {linkData.name}
          </a>
        ))}
        <hr />
        <div className={style.header__contacts}>
          <span>Контакты:</span>
          <a href="tel:+79991234567">+7 999 123 45 67</a>
          <a href="mailto:hello@cyberia.studio">hello@cyberia.studio</a>
          <span>ул.Ярных, д.35, оф.10</span>
        </div>
        <hr />
      </div>
    </div>
  );
}
