import cn from "classnames";

export const ModalField = ({
  className,
  input,
  label,
  model,
  id,
  meta: { touched, invalid, error },
  checkbox,
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
