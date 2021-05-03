import cn from "classnames";
import "./style.scss";

const Button = ({
  children,
  className,
  text,
  type,
  onClick,
  style = "button",
}) => {
  return (
    <button
      className={cn(className, "button", {
        "button--link": style === "link",
      })}
      type={type}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
