import React, { useState } from "react";
import { PopupField, PopupCheckbox } from "./popupField";
import Button from "../buttons/Button";
import { required, phoneNumber, email } from "./validations";
import "./popup.scss";

const phoneOrEmail = () => {
  if (!phoneNumber() | !email()) {
    return "Must be email or phone number";
  }
  return undefined;
};

const AuthorizationForm = ({ onSubmit, onGoogleAuth, onFBAuth }) => {
  const [userInfo, setUser] = useState({});
  const handleInputChange = (event) => {
    event.preventDefault();
    const {
      dataset: { model },
      value,
    } = event.target;
    setUser({
      ...userInfo,
      [model]: value,
    });
  };
  return (
    <section className="popup" id="auth-popup">
      <div className="popup__wrapper">
        <span className="popup__close"></span>
        <h2 className="popup__title">Авторизація</h2>
        <p className="popup__auxiliary-text">Увійти за допомогою:</p>
        <div className="popup__sign-with">
          <button
            onClick={onGoogleAuth}
            className="popup__sign-with-btn popup__sign-with-btn--google"
          >
            Google
          </button>
          <button
            onClick={onFBAuth}
            className="popup__sign-with-btn popup__sign-with-btn--facebook"
          >
            Facebook
          </button>
        </div>
        <form onSubmit={onSubmit} className="popup__form">
          <PopupField
            className="popup__form-field"
            label="Name"
            model="login"
            id="auth-login"
            name="auth-login"
            type="text"
            onChange={handleInputChange}
            validate={[required, phoneOrEmail]}
          />
          <PopupField
            className="popup__form-field"
            label="Password"
            model="password"
            id="auth-password"
            name="auth-password"
            type="password"
            onChange={handleInputChange}
            validate={required}
          />
          <a href="#" className="popup__fgt-pwd">
            Забули пароль?
          </a>
          <PopupCheckbox
            className="popup__form-checkbox"
            type="checkbox"
            label="ppd-agreement"
            model="ppd"
            id="ppd-agreement"
            name="ppd-agreement"
            validate={required}
          />
          <Button type="submit" className="popup__submit-btn">
            Зареєструватись
          </Button>
        </form>
        <p className="popup__link-text">
          Уже маєте профіль?
          <a href="#" className="popup__link">
            Увійти
          </a>
        </p>
      </div>
    </section>
  );
};

export default AuthorizationForm