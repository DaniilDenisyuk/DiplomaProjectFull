import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import cn from "classnames";

import { useSelector } from "react-redux";
import { getToken, getUserId } from "../../../common/selectors";
import { userService } from "../../../services/userService";
import Loading from "../../../components/Loading";
import FormGroup from "../../../components/FormGroup";
import Button from "../../../components/Button";

export const ChangePwdForm = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const password = useRef({});
  const token = useSelector(getToken);
  const userId = useSelector(getUserId);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: { oldPwd: "", newPwd: "", newPwd2: "" },
  });

  password.current = watch("newPwd", "");

  const onSubmit = async ({ oldPwd, newPwd }, e) => {
    setIsSubmitting(true);
    await userService.changeUserPassword(token, userId, oldPwd, newPwd);
    setIsSubmitting(false);
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <form
      onSubmit={formSubmit(onSubmit, onError)}
      className={cn(className, "form", "form--account")}
    >
      <h2 className="form__heading">Особиста інформація</h2>
      <FormGroup
        className="form__form-group"
        inputProps={{ ...register("oldPwd", { required: true }), type: "text" }}
        error={errors.phone && errors.phone.message}
        label="Старий пароль"
      />
      <FormGroup
        className="form__form-group"
        inputProps={{ ...register("newPwd", { required: true }), type: "text" }}
        error={errors.phone && errors.phone.message}
        label="Новий пароль"
      />
      <FormGroup
        className="form__form-group"
        inputProps={{
          ...register("newPwd2", {
            required: true,
            validate: (value) =>
              value === password.current || "Паролі не співпадають",
          }),
          type: "text",
        }}
        error={errors.email && errors.email.message}
        label="Повторіть новий пароль"
      />
      <Button type="submit" className="form__submit">
        {isSubmitting ? (
          <Loading className="form__submitting" message="Зберігаємо" />
        ) : (
          "Зберегти"
        )}
      </Button>
    </form>
  );
};
