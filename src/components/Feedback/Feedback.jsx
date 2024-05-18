import React from "react";
import styles from "./Feedback.module.scss";

export default function Feedback() {
  return (
    <div className="container">
      <form action="#">
        <fieldset>
          <legend>
            Расскажите
            <br />о вашем проекте:
          </legend>
          <div>
            <label htmlFor="name">
              <span>Ваше имя*</span>
              <input required type="text" id="name" />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              <span>Email*</span>
              <input required type="email" id="email" />
            </label>
          </div>
          <div>
            <label htmlFor="phone">
              <span>Телефон*</span>
              <input required type="tel" id="phone" />
            </label>
          </div>
          <label htmlFor="message" className={styles.large_input}>
            <span>Сообщение*</span>
            <textarea required name="message" id="message" />
          </label>
          <label htmlFor="isAgree" className={styles.checkbox_label}>
            <input
              type="checkbox"
              id="isAgree"
              className={styles.checkbox_input}
              required
            />
            <span className={styles.checkbox} />
            Согласие на обработку персональных данных
          </label>
        </fieldset>
        <button type="submit">Обсудить проект</button>
      </form>
    </div>
  );
}
