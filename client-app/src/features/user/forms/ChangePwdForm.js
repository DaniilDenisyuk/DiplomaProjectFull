import { useForm } from "react-hook-form";
import { useState, useRef } from "react";
import cn from "classnames";
import { userDataService } from "../../../services/userDataService";
import Loading from "../../../components/Loading";
import FormGroup from "../../../components/FormGroup";
import Button from "../../../components/Button";
import { password as passwordValidation } from "../../../common/validations";

export const ChangePwdForm = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const password = useRef({});
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: { oldPwd: "", newPwd: "", newPwd2: "" },
  });

  password.current = watch("newPwd", "");

  const onSubmit = async ({ oldPwd, newPwd }, e) => {
    setIsSubmitting(true);
    userDataService
      .changeUserPassword(oldPwd, newPwd)
      .then(() => {
        reset();
      })
      .catch(console.log)
      .finally(() => setIsSubmitting(false));
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
          error={errors.oldPwd && errors.oldPwd.message}
          label="Старий пароль"
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("newPwd", {
              required: true,
              validate: (v) =>
                passwordValidation(v) || "мін.8 cимв.,1 циф.,1 літ.",
            }),
            type: "password",
          }}
          error={errors.newPwd && errors.newPwd.message}
          label="Новий пароль"
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("newPwd2", {
              required: true,
              validate: (value) =>
                value === password.current || "Не співпадають",
            }),
            type: "password",
          }}
          error={errors.newPwd2 && errors.newPwd2.message}
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
