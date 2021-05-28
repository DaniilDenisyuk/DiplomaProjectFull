import { Link } from "react-router-dom";
import cn from "classnames";
import "./style.scss";

const LISTS = [
  {
    name: "Інформація",
    listClass: "info",
    links: [
      {
        name: "Про нас",
        to: "/about",
      },
      {
        name: "Інформація про доставку",
        to: "/delivery",
      },
    ],
  },
  {
    name: "Служба підтримки",
    listClass: "support",
    links: [
      {
        name: "Всі контакти",
        to: "/contacts",
      },
      {
        name: "Мапа сайту",
        to: "/map",
      },
    ],
  },
  {
    name: "Контакти",
    listClass: "contacts",
    links: [
      {
        name: "+38(096)12-34-567",
        to: "tel:+380961234567",
        linkClass: "i-phone",
      },
      {
        name: "+38(096)12-34-567",
        to: "tel:+380961234567",
        linkClass: "i-phone",
      },
    ],
  },
  {
    name: "Особистий кабінет",
    listClass: "account",
    links: [
      {
        name: "Особистий кабінет",
        to: "/account",
      },
      {
        name: "Історія замовлень",
        to: "/account/history",
      },
    ],
  },
  {
    name: "Додатково",
    listClass: "additional",
    links: [
      {
        name: "Акції",
        to: "/discounts",
      },
      {
        name: "Новинки",
        to: "/menu/new",
      },
    ],
  },
];

const RenderFooterList = ({ className, name, links, listClass }) => {
  const items = links.map(({ name, to }, i) => (
    <Link to={to} className="footer-list__link" key={`link-${i}`}>
      {name}
    </Link>
  ));
  return (
    <div className={`${className}--${listClass}`}>
      <ul className={cn(className, "footer-list")}>
        <p className="footer-list__heading">{name}</p>
        {items}
      </ul>
    </div>
  );
};

const Footer = () => {
  const lists = LISTS.map((list, i) => (
    <RenderFooterList key={`list-${i}`} className="footer__list" {...list} />
  ));
  return (
    <footer className="footer __container">
      <div className="footer__wrapper">
        <div className="footer__row">{lists}</div>
        <p className="footer__copyright">
          © Developed by Daniil Denysiuk
          <br /> Designed by Rostislav Marych
          <br /> 2021
        </p>
      </div>
    </footer>
  );
};

export default Footer;
