import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

export default function FeedbackInput({
  text,
  name,
  type,
  state,
  handler,
  error = "",
}) {
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
