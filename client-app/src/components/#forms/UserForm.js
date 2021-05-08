import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";
import Button from "../../componentsTP/Button";

export const UserForm = ({
  handleSubmit,
  submitComponent: Component,
  submitMessage,
}) => {
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
  const onError = (errors, e) => console.log(errors, e);
  return (
    <form onSubmit={formSubmit(onSubmit, onError)} className="form">
      <h2 className="form__heading">Редактирование профиля</h2>
      <div className="form__group">
        <p className="form__label">Имя</p>
        <input
          type="text"
          placeholder="Ваш логин"
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
        <p className="form__label">Пол</p>
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
          Component ? (
            <Component message={submitMessage ? submitMessage : ""} />
          ) : submitMessage ? (
            submitMessage
          ) : (
            "Вход..."
          )
        ) : (
          "Войти"
        )}
      </Button>
      <Button />
    </form>
  );
};
