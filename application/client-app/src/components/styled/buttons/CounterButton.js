import React from "react";
import classNames from "classnames";
import "./CounterButton.scss";

function CounterButton({ className, onClick, outline, type }) {
  const classes = classNames("counter-button", className, {
    "counter-button--outline": outline,
    "counter-button--add": type === 1,
    "counter-button--substract": type === 2,
  });
  return <button className={classes} onClick={onClick}></button>;
}

export default CounterButton;
