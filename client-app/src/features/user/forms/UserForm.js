import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserFirstName,
  getUserLastName,
  getUserPhone,
  getUserEmail,
} from "../../../common/selectors";
import { infoActions } from "../userSlice";
import Loading from "../../../components/Loading";
import FormGroup from "../../../components/FormGroup";
import Button from "../../../components/Button";
import { trimFields } from "../../../common/utils";
import {
  wordWithHyphen,
  email as emailValidation,
  phone as phoneValidation,
  minLength,
  maxLength,
} from "../../../common/validations";

export const UserForm = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const firstName = useSelector(getUserFirstName);
  const lastName = useSelector(getUserLastName);
  const phone = useSelector(getUserPhone);
  const email = useSelector(getUserEmail);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onBlur",
    defaultValues: { first_name: firstName, last_name: lastName, phone, email },
  });
  const onSubmit = async (data, e) => {
    trimFields(data);
    setIsSubmitting(true);
    await dispatch(infoActions.updateUserInfo(data));
    setIsSubmitting(false);
  };
  const onError = (errors, e) => console.log(errors, e);
  return (
    <form
      onSubmit={formSubmit(onSubmit, onError)}
      className={cn(className, "form")}
    >
      <div className="form__wrapper">
        <h2 className="form__heading">Особиста інформація</h2>
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("first_name", {
              required: false,
              validate: (v) => {
                if (v === "") return true;
                return !minLength(2)(v)
                  ? "Мінімум 2 літери"
                  : !maxLength(20)(v)
                  ? "Максимум 20 літер"
                  : !wordWithHyphen(v)
                  ? "Слово з/без тире"
                  : true;
              },
            }),
            type: "text",
          }}
          error={errors.first_name && errors.first_name.message}
          label="Ім'я"
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("last_name", {
              required: false,
              validate: (v) => {
                if (v === "") return true;
                return !minLength(2)(v)
                  ? "Мінімум 2 літери"
                  : !maxLength(20)(v)
                  ? "Максимум 20 літер"
                  : !wordWithHyphen(v)
                  ? "Слово з/без тире"
                  : true;
              },
            }),
            type: "text",
          }}
          error={errors.last_name && errors.last_name.message}
          label="Прізвище"
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("phone", {
              required: false,
              validate: (v) => {
                if (v === "") return true;
                return !minLength(10)(v)
                  ? "Мінімум 10 символів"
                  : !maxLength(13)(v)
                  ? "Максимум 13 символів"
                  : !phoneValidation(v)
                  ? "Формат номеру: +380ххххххххх"
                  : true;
              },
            }),
            type: "text",
          }}
          error={errors.phone && errors.phone.message}
          label="Телефон"
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("email", {
              required: false,
              validate: (v) => {
                if (v === "") return true;
                return emailValidation(v) || "Некоректна адреса";
              },
            }),
            type: "text",
          }}
          error={errors.email && errors.email.message}
          label="Електронна пошта"
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
