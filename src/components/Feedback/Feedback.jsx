import React, { useState, useEffect } from "react";
import styles from "./Feedback.module.scss";
import feedbackImg from "../../assets/icons/mobile-feedback-icon.png";
import FeedbackInput from "../Input/Input";
import * as Validation from "./validation";

export default function Feedback() {
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    setFormState({
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      phone: localStorage.getItem("phone") || "",
      message: localStorage.getItem("message") || "",
    });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormState((prevState) => {
      const updatedState = { ...prevState, [id]: value };
      localStorage.setItem(id, value);

      if (id === "name") {
        setErrors((prev) => ({
          ...prev,
          name: Validation.validateName(value)
            ? ""
            : "Имя должно содержать минимум 2 символа",
        }));
      } else if (id === "email") {
        setErrors((prev) => ({
          ...prev,
          email: Validation.validateEmail(value)
            ? ""
            : "Введите корректный email",
        }));
      } else if (id === "phone") {
        setErrors((prev) => ({
          ...prev,
          phone: Validation.validatePhone(value)
            ? ""
            : "Введите корректный номер телефона",
        }));
      }

      return updatedState;
    });

    if (value !== "") {
      e.target.classList.add(styles.input_has_content);
    } else {
      e.target.classList.remove(styles.input_has_content);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = formState;
    const isValid =
      Validation.validateName(name) &&
      Validation.validateEmail(email) &&
      Validation.validatePhone(phone);

    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        submit: "Пожалуйста, исправьте ошибки в форме перед отправкой",
      }));
      return;
    }

    const feedbackData = { name, email, phone, message };

    try {
      const response = await fetch(
        "https://api.test.cyberia.studio/api/v1/feedbacks",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        },
      );

      if (response.status === 422) {
        const errorData = await response.json();
        setErrors(errorData.errors);
      } else if (!response.ok) {
        throw new Error("Что-то пошло не так!");
      } else {
        setErrors({ submit: "Успешно!" });
        setFormState({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        localStorage.clear();
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        server: `Ошибка со стороны сервера: ${error.message}`,
      }));
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <img src={feedbackImg} alt="Icon" />
          <legend>
            Расскажите
            <br />о вашем проекте:
          </legend>
          <FeedbackInput
            text="Ваше имя"
            name="name"
            type="text"
            state={formState.name}
            handler={handleInputChange}
            error={errors.name}
          />
          <FeedbackInput
            text="Email"
            name="email"
            type="email"
            state={formState.email}
            handler={handleInputChange}
            error={errors.email}
          />
          <FeedbackInput
            text="Телефон"
            name="phone"
            type="tel"
            state={formState.phone}
            handler={handleInputChange}
            error={errors.phone}
          />
          <label htmlFor="message" className={styles.large_input}>
            <textarea
              value={formState.message}
              onChange={handleInputChange}
              required
              name="message"
              id="message"
              className={formState.message ? styles.input_has_content : ""}
            />
            <span>Сообщение*</span>
          </label>
          <label htmlFor="isAgree" className={styles.checkbox_label}>
            <input
              type="checkbox"
              id="isAgree"
              className={styles.checkbox_input}
              required
              name="checkbox-agree"
            />
            <span className={styles.checkbox} />
            Согласие на обработку персональных данных
          </label>
        </fieldset>
        <button type="submit">Обсудить проект</button>
        {errors.submit && (
          <div className={styles.error_sentmessage}>{errors.submit}</div>
        )}
        {errors.somethingWentWrond && (
          <div className={styles.error_sentmessage}>
            {errors.somethingWentWrond}
          </div>
        )}
        {errors.server && (
          <div className={styles.error_sentmessage}>{errors.server}</div>
        )}
        <p>
          Нажимая “Обсудить проект”, Вы даете согласие на обработку персональных
          данных
        </p>
      </form>
    </div>
  );
}
