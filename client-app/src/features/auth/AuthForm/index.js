import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";

import { authActions } from "../authSlice";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import "./style.scss";

const AuthForm = () => {
  const dispatch = useDispatch();
  const onAuth = ({ login, password }) => {
    return dispatch(authActions.login(login, password));
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: { login: "", password: "" } });
  const onSubmit = async (data, e) => {
    setIsSubmitting(true);
    await onAuth(data);
    setIsSubmitting(false);
  };
  const onError = (errors, e) => ({ errors, e });
  return (
    <form onSubmit={formSubmit(onSubmit, onError)} className="form">
      <h2 className="form__heading">Авторизація</h2>
      <p className="form__tip-message">Заповніть форму нижче:</p>
      <div className="form__group form__group--no-label">
        <input
          type="text"
          placeholder="e-mail/телефон"
          {...register("login", { required: "required" })}
          className={cn("form__input", {
            "form__input--invalid": errors.login,
          })}
        />
        {errors.login && (
          <p className="form__error-message">{errors.login.message}</p>
        )}
      </div>
      <div className="form__group form__group--no-label">
        <input
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: "required",
          })}
          className={cn("form__input", {
            "form__input--invalid": errors.password,
          })}
        />
        {errors.password && (
          <p className="form__error-message">{errors.password.message}</p>
        )}
        <Link className="form__tip" to="/reset-password">
          Забули пароль?
        </Link>
      </div>
      <Button type="submit" primary className="form__submit">
        {isSubmitting ? (
          <Loading className="form__submitting" message="Вхід" />
        ) : (
          "Увійти"
        )}
      </Button>
      <div className="form__links">
        Ще не зареєстровані?
        <Link className="form__link" to="/register">
          Зареєструватися
        </Link>
      </div>
    </form>
  );
};

export const AuthModal = Modal(AuthForm);
