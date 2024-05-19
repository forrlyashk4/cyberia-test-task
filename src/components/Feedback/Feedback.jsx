import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Feedback.module.scss";

function FeedbackInput({ text, name, type, state, handler }) {
  return (
    <div>
      <label htmlFor={name}>
        <span>{text}*</span>
        <input
          value={state}
          onChange={handler}
          required
          type={type}
          id={name}
          className={styles[`input-${name}`]}
        />
      </label>
    </div>
  );
}

FeedbackInput.propTypes = {
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};

export default function Feedback() {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [message, setMessage] = useState(localStorage.getItem("message") || "");
  const [errors, setErrors] = useState({});

  console.log(errors);

  const handleInputChange = (e) => {
    const newData = e.target.value;
    switch (e.target.id) {
      case "name":
        localStorage.setItem("name", newData);
        setName(newData);
        break;
      case "email":
        localStorage.setItem("email", newData);
        setEmail(newData);
        break;
      case "phone":
        localStorage.setItem("phone", newData);
        setPhone(newData);
        break;
      case "message":
        localStorage.setItem("message", newData);
        setMessage(newData);
        break;
      default:
        break;
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

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
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
        throw new Error("Что-то пошло не так!");
      } else {
        alert("Фидбэк успешно отправлен!");
      }
    } catch (error) {
      console.error("Ошибка при отправке фидбэка:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
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
          />
          <FeedbackInput
            text="Email"
            name="email"
            type="email"
            state={email}
            handler={handleInputChange}
          />
          <FeedbackInput
            text="Телефон"
            name="phone"
            type="tel"
            state={phone}
            handler={handleInputChange}
          />
          <label htmlFor="message" className={styles.large_input}>
            <span>Сообщение*</span>
            <textarea
              value={message}
              onChange={handleInputChange}
              required
              name="message"
              id="message"
            />
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
