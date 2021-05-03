import React from "react";
import classNames from "classnames";
import "./CounterButton.scss";

function CounterButton({ className, onClick, outlined, isIncrease, disabled }) {
  const classes = classNames("counter-button", className, {
    "counter-button--outline": outlined,
    "counter-button--less": !isIncrease,
    "counter-button--more": isIncrease,
  });
  return (
    <button className={classes} onClick={onClick} disabled={disabled}></button>
  );
}

export default CounterButton;
