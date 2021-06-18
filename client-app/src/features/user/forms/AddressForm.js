import { useForm } from "react-hook-form";
import { useState } from "react";
import cn from "classnames";

import { useSelector, useDispatch } from "react-redux";
import { getUserAddress } from "../../../common/selectors";
import { infoActions } from "../userSlice";
import Loading from "../../../components/Loading";
import FormGroup from "../../../components/FormGroup";
import Button from "../../../components/Button";

export const AddressForm = ({ className }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { town, street, house, door } = useSelector(getUserAddress);
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { town, street, house, door },
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
          inputProps={{ ...register("town", { required: true }), type: "text" }}
          error={errors.town && errors.town.message}
          label="Місто"
        />
        <FormGroup
          className="form__form-group"
          inputProps={{
            ...register("street", { required: true }),
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
