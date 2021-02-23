import React from "react";
import classNames from "classnames";
import "./ButtonLink.scss";

function ButtonLink({ children, className, href }) {
  const classes = classNames("more-link", className);
  return (
    <a className={classes} href={href}>
      {children}
    </a>
  );
}

export default ButtonLink;
