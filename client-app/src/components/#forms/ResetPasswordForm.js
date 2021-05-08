import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";
import Button from "../../components/Button";
import Loading from "../Loading";
import "./style.scss";

export const RegisterForm = ({ handleSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { email: "" },
  });
  const onSubmit = async (data, e) => {
    setIsSubmitting(true);
    await handleSubmit(data);
    setIsSubmitting(false);
  };
  const onError = (errors, e) => console.log(errors, e);
  return (
    <form onSubmit={formSubmit(onSubmit, onError)} className="form">
      <h2 className="form__heading">Відновлення паролю</h2>
      <div className="form__group">
        <input
          type="email"
          placeholder="e-mail"
          {...register("email", { required: "required" })}
          className={cn("form__input", {
            "form__input--invalid": errors.name,
          })}
        />
        {errors.name && (
          <p className="form__error-message">{errors.name.message}</p>
        )}
      </div>
      <Button type="submit" className="form__submit">
        {isSubmitting ? (
          <Loading className="form__submitting" message="" />
        ) : (
          "Відновити"
        )}
      </Button>
    </form>
  );
};
