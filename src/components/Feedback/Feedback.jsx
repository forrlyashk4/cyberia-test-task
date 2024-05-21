import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Feedback.module.scss";
import feedbackImg from "../../assets/icons/mobile-feedback-icon.png";

function FeedbackInput({ text, name, type, state, handler, error = "" }) {
  const inputClassname = `input-${name}`;
  return (
    <div>
      <label htmlFor={name}>
        <input
          value={state}
          onChange={handler}
          required
          type={type}
          id={name}
          className={`${styles[inputClassname]} ${state ? styles.input_has_content : ""} ${error ? styles.input_error : ""}`}
        />
        <span>{text}*</span>
      </label>
      {error && <div className={styles.error_message}>{error}</div>}
    </div>
  );
}

FeedbackInput.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
  error: PropTypes.string,
};

FeedbackInput.defaultProps = {
  error: "",
};

export default function Feedback() {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [message, setMessage] = useState(localStorage.getItem("message") || "");
  const [errors, setErrors] = useState({});

  const validateName = (nameStr) => nameStr.length >= 2;

  const validateEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailStr);
  };

  const validatePhone = (phoneStr) => {
    const phoneRegex = /^[0-9\-+() ]{7,15}$/;
    return phoneRegex.test(phoneStr);
  };

  const handleInputChange = (e) => {
    const newData = e.target.value;
    const { id } = e.target;

    switch (id) {
      case "name":
        localStorage.setItem("name", newData);
        setName(newData);
        setErrors((prev) => ({
          ...prev,
          name: validateName(newData)
            ? ""
            : "Имя должно содержать минимум 2 символа",
        }));
        break;
      case "email":
        localStorage.setItem("email", newData);
        setEmail(newData);
        setErrors((prev) => ({
          ...prev,
          email: validateEmail(newData) ? "" : "Введите корректный email",
        }));
        break;
      case "phone":
        localStorage.setItem("phone", newData);
        setPhone(newData);
        setErrors((prev) => ({
          ...prev,
          phone: validatePhone(newData)
            ? ""
            : "Введите корректный номер телефона",
        }));
        break;
      case "message":
        localStorage.setItem("message", newData);
        setMessage(newData);
        break;
      default:
        break;
    }

    if (newData !== "") {
      e.target.classList.add(styles.input_has_content);
    } else {
      e.target.classList.remove(styles.input_has_content);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      name,
      email,
      phone,
      message,
    };

    const isValid =
      validateName(name) && validateEmail(email) && validatePhone(phone);

    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        submit: "Пожалуйста, исправьте ошибки в форме перед отправкой",
      }));
      return;
    }

    setName("");
    localStorage.setItem("name", "");
    setEmail("");
    localStorage.setItem("email", "");
    setPhone("");
    localStorage.setItem("phone", "");
    setMessage("");
    localStorage.setItem("message", "");
    setErrors({});
    e.target.reset();

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
        setErrors((prev) => ({
          ...prev,
          somethingWentWrond: `Что-то пошло не так!`,
        }));
        setErrors("Что-то пошло не так!");
        throw new Error("Что-то пошло не так!");
      } else {
        setErrors("Успешно!");
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        server: `Ошибка со стороны сервера: ${error}`,
      }));
      throw new Error("Ошибка при отправке фидбэка!");
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
            state={name}
            handler={handleInputChange}
            error={errors.name}
          />
          <FeedbackInput
            text="Email"
            name="email"
            type="email"
            state={email}
            handler={handleInputChange}
            error={errors.email}
          />
          <FeedbackInput
            text="Телефон"
            name="phone"
            type="tel"
            state={phone}
            handler={handleInputChange}
            error={errors.phone}
          />
          <label htmlFor="message" className={styles.large_input}>
            <textarea
              value={message}
              onChange={handleInputChange}
              required
              name="message"
              id="message"
              className={message ? styles.input_has_content : ""}
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
