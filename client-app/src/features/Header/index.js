import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import cn from "classnames";

import { AuthButton } from "../auth";
import { CartModule } from "../order";
import SelectLocation from "../location/SelectLocation";
import SelectLang from "../lang/SelectLang";
import Logo from "../../components/Logo";
import "./style.scss";

const LINKS = {
  main: [
    {
      name: "Головна",
      exact: true,
      to: "/",
    },
    {
      name: "Меню",
      to: "/menu",
    },
    {
      name: "Замовлення",
      to: "/checkout",
    },
    {
      name: "Кабінет",
      to: "/account",
    },
  ],
  aux: [
    {
      name: "Про нас",
      to: "/about",
    },
    {
      name: "Контакти",
      to: "/contact",
    },
  ],
};

const NavMenu = ({ className, links, auxLinks, isActive, onClose }) => {
  const MainLinks = links.map(({ name, to, exact }, i) => (
    <NavLink
      exact={exact}
      to={to}
      key={`main-${i}`}
      className="nav-menu__link"
      activeClassName="nav-menu__link--active"
    >
      {name}
    </NavLink>
  ));
  const AuxLinks = auxLinks.map(({ name, to, exact }, i) => (
    <Link exact={exact} to={to} key={`aux-${i}`} className="nav-menu__link">
      {name}
    </Link>
  ));
  return (
    <nav
      className={cn(className, "nav-menu", { "nav-menu--active": isActive })}
    >
      <Logo className="nav-menu__logo" />
      <span className="nav-menu__close i-close" onClick={onClose} />
      <ul className="nav-menu__main-links">{MainLinks}</ul>
      <ul className="nav-menu__aux-links">{AuxLinks}</ul>
    </nav>
  );
};

const Burger = ({ className, onClick }) => (
  <button className={cn(className, "burger-btn")} onClick={onClick}>
    <span />
  </button>
);

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  return (
    <>
      <header className="header">
        <section className="header__wrapper __container">
          <Burger onClick={() => setMenuOpened(true)} />
          <NavMenu
            className="header__nav"
            links={LINKS.main}
            auxLinks={LINKS.aux}
            isActive={menuOpened}
            onClose={() => setMenuOpened(false)}
          />
          <SelectLocation className="header__location" />
          <SelectLang className="header__lang" />
          <AuthButton className="header__login" />
          <CartModule className="header__cart" />
        </section>
      </header>
    </>
  );
};

export default Header;
