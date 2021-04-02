import Logo from "./Logo";
import { NavLink, Link } from "react-router-dom";
import { SelectLocation, SelectLanguage } from "./selects";
import { useDisableScroll } from "./hooks";
import { connect } from "react-redux";
import { useState, useRef } from "react";
import cn from "classnames";
import "./Header.scss";

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
      name: "Акції",
      to: "/discounts",
    },
    {
      name: "Доставка",
      to: "/delivery",
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

const BurgerButton = ({ className, handleClick }) => (
  <button className={cn(className, "burger-btn")} onClick={handleClick}>
    <span></span>
  </button>
);

const RenderLink = ({ name, to, className, exact }) => (
  <NavLink
    exact={exact}
    to={to}
    className={className}
    activeClassName={`${className}--active`}
  >
    {name}
  </NavLink>
);

const LoginButton = ({ children, className, handleClick }) => (
  <button className={cn(className, "login-btn")} onClick={handleClick}>
    {children}
  </button>
);

const CartButton = ({ className, handleClick, sum = 0 }) => (
  <button className={cn(className, "cart-btn")} onClick={handleClick}>
    {sum} грн.
  </button>
);

const NavMenu = ({
  links,
  auxLinks,
  className,
  isActive,
  handleCloseClick,
}) => {
  const MainLinks = links.map((link, i) => (
    <RenderLink key={`link-${i}`} {...link} className="nav-menu__link" />
  ));
  const AuxLinks = auxLinks.map((link, i) => (
    <RenderLink key={`link-${i}`} {...link} className="nav-menu__link" />
  ));
  return (
    <nav
      className={cn(className, "nav-menu", { "nav-menu--active": isActive })}
    >
      <Logo className="nav-menu__logo" />
      <span className="nav-menu__close i-close" onClick={handleCloseClick} />
      <ul className="nav-menu__main-links">{MainLinks}</ul>
      <ul className="nav-menu__aux-links">{AuxLinks}</ul>
    </nav>
  );
};

export const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <header className="header __container">
      <section className="header__wrapper __content-wrapper">
        <BurgerButton
          className="header__burger"
          handleClick={() => {
            setMenuOpened(!menuOpened);
          }}
        />
        <NavMenu
          className="header__nav"
          links={LINKS.main}
          auxLinks={LINKS.aux}
          isActive={menuOpened}
          handleCloseClick={() => setMenuOpened(false)}
        />
        <SelectLocation className="header__location" />
        <SelectLanguage className="header__lang" />
        <LoginButton className="header__login">Увійти</LoginButton>
        <CartButton className="header__cart" />
      </section>
    </header>
  );
};

const mapState = (state) => {};

const mapDispatch = {};

//const HeaderConnected = connect(mapState, mapDispatch)(Header);

//export { HeaderConnected as Header };
