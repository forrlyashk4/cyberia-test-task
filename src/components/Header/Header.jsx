import React from "react";
import logo from "../../assets/icons/cyberiaLogo.svg";
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
  return (
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
    </header>
  );
}
