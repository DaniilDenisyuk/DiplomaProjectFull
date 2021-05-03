import { useState } from "react";
import { ModalField, validations } from ".";
import Button from "../Button";

export const AuthModal = ({ isActive, onSubmit, onGoogleAuth, onFBAuth }) => {
  const [userInfo, setUserInfo] = useState({
    login: "",
    password: "",
  });

  const handleInputChange = (event) => {
    event.preventDefault();
    const {
      dataset: { model },
      value,
    } = event.target;
    setUserInfo({
      ...userInfo,
      [model]: value,
    });
  };
  return (
    <section className="auth-modal modal">
      <div className="modal__wrapper">
        <span className="modal__close"></span>
        <h2 className="modal__title">Авторизація</h2>
        <p className="modal__auxiliary-text">Увійти за допомогою:</p>
        <div className="modal__sign-with">
          <button
            onClick={onGoogleAuth}
            className="modal__sign-with-btn modal__sign-with-btn--google"
          >
            Google
          </button>
          <button
            onClick={onFBAuth}
            className="modal__sign-with-btn modal__sign-with-btn--facebook"
          >
            Facebook
          </button>
        </div>
        <form onSubmit={onSubmit} className="modal__form">
          <modalField
            className="modal__form-field"
            label="Name"
            model="login"
            id="auth-login"
            name="auth-login"
            type="text"
            onChange={handleInputChange}
            validate={[required, phoneOrEmail]}
          />
          <modalField
            className="modal__form-field"
            label="Password"
            model="password"
            id="auth-password"
            name="auth-password"
            type="password"
            onChange={handleInputChange}
            validate={required}
          />
          <a href="#" className="modal__fgt-pwd">
            Забули пароль?
          </a>
          <modalCheckbox
            className="modal__form-checkbox"
            type="checkbox"
            label="ppd-agreement"
            model="ppd"
            id="ppd-agreement"
            name="ppd-agreement"
            validate={required}
          />
          <Button type="submit" className="modal__submit-btn">
            Зареєструватись
          </Button>
        </form>
        <p className="modal__link-text">
          Уже маєте профіль?
          <a href="#" className="modal__link">
            Увійти
          </a>
        </p>
      </div>
    </section>
  );
};
