import cn from "classnames";

const ModalField = ({
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

export default ModalField;
