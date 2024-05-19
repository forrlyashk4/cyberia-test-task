import React from "react";
import style from "./BreadСrumbs.module.scss";

const pathArr = [
  {
    name: "Главная",
    path: "./",
  },
  {
    name: "Кейсы",
    path: "./",
  },
];

export default function BreadCrumbs() {
  return (
    <div className="container">
      <nav>
        {pathArr.map((item, index, arr) => {
          if (index === arr.length - 1) {
            return (
              <a key={item.name} href={item.path} className={style.lastItem}>
                {item.name}
              </a>
            );
          }

          return (
            <span key={item.name}>
              <a href={item.path}>{item.name}</a>
              &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;
            </span>
          );
        })}
      </nav>
    </div>
  );
}
