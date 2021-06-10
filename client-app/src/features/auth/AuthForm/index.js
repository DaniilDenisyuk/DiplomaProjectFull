import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";
import { authActions } from "../authSlice";
import FormGroup from "../../../components/FormGroup";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import "./style.scss";

const AuthForm = ({ onSuccess }) => {
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
    onSuccess();
  };
  const onError = (errors, e) => ({ errors, e });
  return (
    <form onSubmit={formSubmit(onSubmit, onError)} className="auth-form form">
      <div className="form__wrapper">
        <h2 className="form__heading">Авторизація</h2>
        <p className="form__tip-message">Заповніть форму нижче:</p>
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("login", { required: "required" }),
            type: "text",
            placeholder: "Логін",
          }}
          error={errors.login && errors.login.message}
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("password", {
              required: "required",
            }),
            type: "password",
            placeholder: "Пароль",
          }}
          error={errors.password && errors.password.message}
          tip={<Link to="/reset-pwd">Забули пароль?</Link>}
        />
        <Button type="submit" primary className="form__submit">
          {isSubmitting ? (
            <Loading className="form__submitting" message="Вхід" />
          ) : (
            "Увійти"
          )}
        </Button>
        <div className="form__links">
          Ще не зареєстровані?
          <Link
            className="form__link"
            to={{
              pathname: "/register",
              state: { background: { pathname: "/" } },
            }}
          >
            Зареєструватися
          </Link>
        </div>
      </div>
    </form>
  );
};

export const AuthModal = Modal(AuthForm);
