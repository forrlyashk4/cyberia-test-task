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
    <nav>
      {pathArr.map((item, index, arr) => {
        if (index === arr.length - 1) {
          return (
            <a href={item.path} className={style.lastItem}>
              {item.name}
            </a>
          );
        }

        return (
          <>
            <a href={item.path}>{item.name}</a>&nbsp;/&nbsp;
          </>
        );
      })}
    </nav>
  );
}
