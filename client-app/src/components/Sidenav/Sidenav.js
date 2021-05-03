import { Link, NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useDisableScroll } from "../#hooks";
import cn from "classnames";
import { useState, useRef } from "react";
import "./Sidenav.scss";

const LINKS = [
  {
    name: "Сети",
    to: "/menu/sets",
    imgClass: "i-sets",
  },
  {
    name: "Роли",
    to: "/menu/rolls",
    imgClass: "i-rolls",
  },
  {
    name: "Суші",
    to: "/menu/sushi",
    imgClass: "i-sushi",
  },
  {
    name: "Супи",
    to: "/menu/soups",
    imgClass: "i-soups",
  },
  {
    name: "Напої",
    to: "/menu/drinks",
    imgClass: "i-drinks",
  },
];

const SidenavLink = ({ className, name, to, imgClass }) => (
  <NavLink
    to={to}
    className={cn(className, imgClass)}
    activeClassName={`${className}--active`}
  >
    {name}
  </NavLink>
);

const SidenavList = ({ links, className }) => {
  const linkEls = links.map((link, i) => (
    <SidenavLink
      key={`sidenav-link-${i}`}
      {...link}
      className="sidenav-menu__link"
    />
  ));
  return <ul className={cn("sidenav-menu", className)}>{linkEls}</ul>;
};

export const Sidenav = () => {
  const [isOpened, setIsOpened] = useState(false);
  useDisableScroll(isOpened);
  return (
    <aside className={cn("sidenav", { "sidenav--active": isOpened })}>
      <div
        className="sidenav__wrapper"
        onMouseEnter={() => setIsOpened(true)}
        onMouseLeave={() => setIsOpened(false)}
      >
        <Link to="/about">
          <Logo className="sidenav__logo" />
        </Link>
        <SidenavList links={LINKS} className="sidenav__menu" />
      </div>
    </aside>
  );
};
