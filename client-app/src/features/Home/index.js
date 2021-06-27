import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

import { MenuItemWithLike, MenuItem } from "../menu/MenuItem";
import ItemSlider from "../../components/ItemSlider";
import {
  getMenuItemsIdAndCategory,
  getIsLoggedIn,
} from "../../common/selectors";
import Contacts from "../Contacts";
import Delivery from "../Delivery";

import "./style.scss";

const Category = ({ name, toFull, items }) => (
  <li className="home__category h-category">
    <div className="h-category__wrapper">
      <h2 className="h-category__heading page-sub-heading">{name}</h2>
      <Link to={toFull} className="h-category__show-all">
        Показати усі
      </Link>
      {items && items.length > 0 && (
        <ItemSlider
          spaceBetween={20}
          className="h-category__items"
          itemComponents={items}
        />
      )}
    </div>
  </li>
);

const Home = () => {
  const items = useSelector(getMenuItemsIdAndCategory);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const CardComponent = isLoggedIn ? MenuItemWithLike : MenuItem;
  const sets = useCallback(() => {
    return items
      .filter((item) => item.category === "sets")
      .map(({ id }) => (
        <CardComponent className="home__menu-item" itemId={id} />
      ));
  }, [items]);
  const rolls = useCallback(() => {
    return items
      .filter((item) => item.category === "rolls")
      .map(({ id }) => (
        <CardComponent className="home__menu-item" itemId={id} />
      ));
  }, [items]);
  const sushi = useCallback(() => {
    return items
      .filter((item) => item.category === "sushi")
      .map(({ id }) => (
        <CardComponent className="home__menu-item" itemId={id} />
      ));
  }, [items]);
  const soups = useCallback(() => {
    return items
      .filter((item) => item.category === "soups")
      .map(({ id }) => (
        <CardComponent className="home__menu-item" itemId={id} />
      ));
  }, [items]);
  const drinks = useCallback(() => {
    return items
      .filter((item) => item.category === "drinks")
      .map(({ id }) => (
        <CardComponent className="home__menu-item" itemId={id} />
      ));
  }, [items]);
  return (
    <div className="home">
      <div className="home__wrapper __container">
        <div className="home__banner "></div>
        <menu className="home__menu">
          <p className="home__menu-title page-heading">Топ позиції</p>
          <p className="home__menu-tip">
            Нижче Ви можете ознойомитися з нашим асориментом
            <br /> вишуканих сетів,суші, супів та комбо - меню
          </p>
          <Category key="sets" name="Сети" toFull="/menu/sets" items={sets()} />
          <Category
            key="rolls"
            name="Роли"
            toFull="/menu/rolls"
            items={rolls()}
          />
          <Category
            key="sushi"
            name="Суші"
            toFull="/menu/sushi"
            items={sushi()}
          />
          <Category
            key="soups"
            name="Супи"
            toFull="/menu/soups"
            items={soups()}
          />
          <Category
            key="drinks"
            name="Напої"
            toFull="/menu/drinks"
            items={drinks()}
          />
        </menu>
        <Delivery className="home__delivery" />
        <Contacts className="home__contacts" />
      </div>
    </div>
  );
};

export default Home;
