import React from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

const LISTS = [
  {
    name: "Інформація",
    links: [
      {
        name: "",
        to: "",
      },
      {
        name: "",
        to: "",
      },
      {
        name: "",
        to: "",
      },
      {
        name: "",
        to: "",
      },
      {
        name: "",
        to: "",
      },
    ],
    linkClass: "",
  },
  {
    name: "Служба підтримки",
    links: [
      {
        name: "",
        to: "",
      },
      {
        name: "",
        to: "",
      },
    ],
  },
  {
    name: "Контакти",
    links: [
      {
        name: "",
        to: "",
      },
      {
        name: "",
        to: "",
      },
      {
        name: "",
        to: "",
      },
    ],
  },
  {
    name: "Особистий кабінет",
    links: [
      {
        name: "",
        to: "",
      },
      {
        name: "",
        to: "",
      },
    ],
  },
  {
    name: "Додатково",
    links: [
      {
        name: "",
        to: "",
      },
      {
        name: "",
        to: "",
      },
    ],
  },
];

const RenderLink = ({ name, to, className }) => (
  <Link to={to} className="className">
    {name}
  </Link>
);

const RenderFooterList = ({ className, links }) => {
  const items = links.map((link, i) => <RenderLink />);
  return (
    <ul className={cn(className, "footer-list")}>
      <p class="footer-list__heading"></p>
      {items}
    </ul>
  );
};

export const Footer = () => {
  const lists = LISTS.map((list, i) => <RenderFooterList {...list} />);
  return (
    <footer className="footer __container">
      <div className="footer__wrapper .__content-wrapper">
        <div class="footer__row">{lists}</div>
        <p className="footer__copyright">© Усі права захищені 2021</p>
      </div>
    </footer>
  );
};
