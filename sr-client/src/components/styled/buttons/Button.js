import React from "react";
import classNames from "classnames";
import "./Button.scss";

function Button({ children, className, type, onClick, outline }) {
  const classes = classNames("button", className, {
    "button--outline": outline,
  });
  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
