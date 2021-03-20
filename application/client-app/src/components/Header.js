import React from "react";
import { NavLink } from "react-router-dom";
import { SelectLocation, SelectLanguage } from "./selects";
import { connect } from "react-redux";
import { useState, useRef } from "react";
import cn from "classnames";
import "./Header.scss";

const LINKS = {
  main: [
    {
      name: "Головна",
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

const renderLink = ({ name, to, className }) => (
  <NavLink
    to={to}
    className={className}
    activeClassName={`${className}--active`}
  >
    {name}
  </NavLink>
);

const Logo = ({ className }) => {
  <div className={cn(className, "logo")}>
    <i class="logo__img" />
    <i class="logo__text" />
  </div>;
};

const LoginButton = ({ children, className, handleClick }) => {
  <button className={cn(className, "login-btn")} onClick={handleClick}>
    {children}
  </button>;
};

const CartButton = ({ className, handleClick, sum }) => {
  <button className={cn(className, "cart-btn")} onClick={handleClick}>
    <p class="cart-btn__sum">{sum} грн.</p>
  </button>;
};

const NavMenu = ({ links, auxLinks, className, isActive }) => {
  const MainLinks = links.map((link, i) => (
    <renderLink key={`link-${i}`} {...link} className="nav-menu__link" />
  ));
  const AuxLinks = auxLinks.map((link, i) => (
    <renderLink key={`link-${i}`} {...link} className="nav-menu__link" />
  ));
  return (
    <nav
      className={cn(className, "nav-menu", { "nav-menu--active": isActive })}
    >
      <Logo className="nav-menu__logo" />
      <span className="nav-menu__close i-close" />
      <ul className="nav-menu__main-links">{MainLinks}</ul>
      <ul className="nav-menu__aux-links">{AuxLinks}</ul>
    </nav>
  );
};

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const menuRef = useRef();
  return (
    <header className="header __container">
      <section class="header__wrapper __content-wrapper">
        <BurgerButton
          className="header__burger"
          handleClick={() => {
            setMenuOpened(!menuOpened);
          }}
        />
        <NavMenu
          ref={menuRef}
          className="header__nav"
          links={LINKS.main}
          auxLinks={LINKS.aux}
          isActive={menuOpened}
        />
        <SelectLocation className="header__location" />
        <SelectLanguage className="header__lang" />
        <LoginButton className="header__login" />
        <CartButton className="header__cart" />
      </section>
    </header>
  );
};

const mapState = (state) => {};

const mapDispatch = {};

export default connect(mapState, mapDispatch)(Header);
