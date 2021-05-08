import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";
import Button from "../../components/Button";
import Loading from "../Loading";
import "./style.scss";

export const AuthForm = ({ handleSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: { login: "", password: "" } });
  const onSubmit = async (data, e) => {
    setIsSubmitting(true);
    await handleSubmit(data);
    setIsSubmitting(false);
  };
  const onError = (errors, e) => ({ errors, e });
  return (
    <form onSubmit={formSubmit(onSubmit, onError)} className="form">
      <h2 className="form__heading">Авторизація</h2>
      <div className="form__group">
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
      <div className="form__group">
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
      </div>
      <Button type="submit" className="form__submit">
        {isSubmitting ? (
          <Loading className="form__submitting" message="Вхід" />
        ) : (
          "Увійти"
        )}
      </Button>
    </form>
  );
};
