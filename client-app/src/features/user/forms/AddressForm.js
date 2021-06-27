import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";

import { useSelector, useDispatch } from "react-redux";
import { getUserAddress } from "../../../common/selectors";
import { infoActions } from "../userSlice";
import Loading from "../../../components/Loading";
import FormGroup from "../../../components/FormGroup";
import Button from "../../../components/Button";
import {
  wordWithHyphen,
  minLength,
  maxLength,
  limitSpecialChars,
  alphaNumericWithHyphen,
} from "../../../common/validations";

export const AddressForm = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { city, street, house, door } = useSelector(getUserAddress);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { city, street, house, door },
  });

  const onSubmit = async (address) => {
    setIsSubmitting(true);
    await dispatch(infoActions.updateUserInfo(address));

    setIsSubmitting(false);
  };

  const onError = (errors, e) => console.log(errors, e);

  return (
    <form
      onSubmit={formSubmit(onSubmit, onError)}
      className={cn(className, "form")}
    >
      <div className="form__wrapper">
        <h2 className="form__heading">Адреса доставки</h2>
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("city", {
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
          error={errors.city && errors.city.message}
          label="Місто"
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("street", {
              required: false,
              validate: (v) => {
                if (v === "") return true;
                return !minLength(2)(v)
                  ? "Мінімум 2 літери"
                  : !maxLength(30)(v)
                  ? "Максимум 30 літер"
                  : !limitSpecialChars(v)
                  ? "Тільки літери, пробіли та тире"
                  : true;
              },
            }),
            type: "text",
          }}
          error={errors.street && errors.street.message}
          label="Вулиця"
        />
        <div className="row">
          <FormGroup
            className="form__form-group"
            inputProps={{
              ...register("house", {
                required: false,
                validate: (v) => {
                  if (v === "") return true;
                  return !maxLength(10)(v)
                    ? "Максимум 10 символів"
                    : !alphaNumericWithHyphen(v)
                    ? "1-9, а-я, -"
                    : true;
                },
              }),
              type: "text",
            }}
            error={errors.house && errors.house.message}
            label="Будинок"
          />
          <FormGroup
            className="form__form-group"
            inputProps={{
              ...register("door", {
                required: false,
                validate: (v) => {
                  if (v === "") return true;
                  return !maxLength(10)(v)
                    ? "Максимум 10 символів"
                    : !alphaNumericWithHyphen(v)
                    ? "1-9, а-я, -"
                    : true;
                },
              }),
              type: "text",
            }}
            error={errors.door && errors.door.message}
            label="Квартира"
          />
        </div>
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
