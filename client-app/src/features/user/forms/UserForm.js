import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../../../common/selectors";
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

export const UserForm = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const firstName = useSelector(getUserFirstName);
  const lastName = useSelector(getUserLastName);
  const phone = useSelector(getUserPhone);
  const email = useSelector(getUserEmail);
  const token = useSelector(getToken);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { firstName, lastName, phone, email },
  });
  const onSubmit = async (data, e) => {
    setIsSubmitting(true);
    await dispatch(infoActions.updateUserInfo(token, data));
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
            ...register("firstName", { required: true }),
            type: "text",
          }}
          error={errors.firstName && errors.firstName.message}
          label="Ім'я"
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("lastName", { required: false }),
            type: "text",
          }}
          error={errors.lastName && errors.lastName.message}
          label="Прізвище"
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("phone", { required: true }),
            type: "text",
          }}
          error={errors.phone && errors.phone.message}
          label="Телефон"
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("email", { required: true }),
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
