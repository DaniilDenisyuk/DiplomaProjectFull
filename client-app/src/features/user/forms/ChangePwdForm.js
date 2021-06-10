import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import cn from "classnames";

import { useSelector } from "react-redux";
import { getToken, getUserId } from "../../../common/selectors";
import { userDataService } from "../../../services/userDataService";
import Loading from "../../../components/Loading";
import FormGroup from "../../../components/FormGroup";
import Button from "../../../components/Button";

export const ChangePwdForm = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const password = useRef({});
  const token = useSelector(getToken);
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
    await userDataService.changeUserPassword(token, oldPwd, newPwd);
    setIsSubmitting(false);
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <form
      onSubmit={formSubmit(onSubmit, onError)}
      className={cn(className, "form")}
    >
      <div className="form__wrapper">
        <h2 className="form__heading">Змінити пароль</h2>
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("oldPwd", { required: true }),
            type: "password",
          }}
          error={errors.phone && errors.phone.message}
          label="Старий пароль"
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("newPwd", { required: true }),
            type: "password",
          }}
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
            type: "password",
          }}
          error={errors.email && errors.email.message}
          label="Повторіть новий пароль"
        />
        <Button type="submit" className="form__submit" secondary>
          {isSubmitting ? (
            <Loading className="form__submitting" message="Зберігаємо" />
          ) : (
            "Зберегти"
          )}
        </Button>
      </div>
    </form>
  );
};
