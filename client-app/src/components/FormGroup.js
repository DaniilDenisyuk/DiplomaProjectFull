import cn from "classnames";

const FormGroup = ({ className, label, inputProps, error }) => {
  <div
    className={cn(className, "form-group", {
      "form-group--invalid": error,
    })}
  >
    {label && <div className="form-group__label">{label}</div>}
    <input {...inputProps} className="form-group__input" />
    {error && <p className="form-group__error">{error}</p>}
  </div>;
};

export default FormGroup;
