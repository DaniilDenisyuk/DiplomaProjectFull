import cn from "classnames";

export const PopupField = ({
  className,
  input,
  label,
  model,
  id,
  meta: { touched, invalid, error },
}) => (
  <div
    className={cn(className, {
      [`${className}--invalid`]: invalid,
      [`${className}--touched`]: touched,
    })}
  >
    <input {...input} id={id} data-model={model}></input>
    <label htmlFor={id}>{label}</label>
    {touched && error && <span className={`${className}-error`}>{error}</span>}
  </div>
);

export const PopupCheckbox = ({
  className,
  input,
  model,
  label,
  id,
  meta: { error },
}) => (
  <div
    className={cn(`${className}`, {
      [`${className}--invalid`]: error,
      [`${className}--checked`]: input.checked,
    })}
  >
    <label htmlFor={id}></label>
    <input {...input} id={id} data-model={model}></input>
    <span>{label}</span>
    {error && <span className={`${className}-error`}>{error}</span>}
  </div>
);
