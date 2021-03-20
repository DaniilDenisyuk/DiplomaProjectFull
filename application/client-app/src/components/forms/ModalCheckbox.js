import cn from "classnames";

const ModalCheckbox = ({
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

export default ModalCheckbox;
