import { NavLink, Link, useHistory } from "react-router-dom";
import { useState } from "react";
import cn from "classnames";

import { AuthButton, AuthInfoPopup } from "../auth";
import { CartButton, CartModal } from "../order";
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
  const [cartOpened, setCartOpened] = useState(false);
  const [infoOpened, setInfoOpened] = useState(false);
  const history = useHistory();
  return (
    <>
      <header className="header __container">
        <section className="header__wrapper">
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
          <AuthButton
            text="Увійти"
            className="header__login"
            onOpenLogin={() =>
              history.push("/login", { background: history.location })
            }
            onOpenInfo={() => setInfoOpened(true)}
          />
          <CartButton
            className="header__cart"
            onOpenCart={() => setCartOpened(true)}
          />
          {infoOpened && (
            <AuthInfoPopup
              className="dropin"
              onClose={() => setInfoOpened(false)}
            />
          )}
        </section>
      </header>
      {cartOpened && (
        <CartModal
          className="header__cart-modal"
          onClose={() => setCartOpened(false)}
          onOrderClick={() => {
            setCartOpened(false);
            history.push("/payment");
          }}
        />
      )}
    </>
  );
};

export default Header;
