import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

import { ItemCardSmart } from "../menu/ItemCard";
import ItemSlider from "../../components/ItemSlider";
import { getMenuItems } from "../../common/selectors";
import Contacts from "../Contacts";
import Delivery from "../Delivery";

import "./style.scss";

const Category = ({ name, toFull, items }) => (
  <li className="home__category h-category">
    <h2 className="mnt-m fz-48 h-category__heading">{name}</h2>
    <Link
      to={toFull}
      className="mnt-m fz-14 orange orange-bd h-category__full-link"
    >
      Показати усі
    </Link>
    <ItemSlider
      spaceBetween={20}
      className="h-category__items"
      items={items}
      itemComponent={ItemCardSmart}
    />
  </li>
);

const Home = () => {
  const items = useSelector(getMenuItems);
  const sets = useCallback(() => {
    return items.filter((item) => item.category === "sets");
  }, [items]);
  const rolls = useCallback(() => {
    return items.filter((item) => item.category === "rolls");
  }, [items]);
  const sushi = useCallback(() => {
    return items.filter((item) => item.category === "sushi");
  }, [items]);
  const soups = useCallback(() => {
    return items.filter((item) => item.category === "soups");
  }, [items]);
  const drinks = useCallback(() => {
    return items.filter((item) => item.category === "drinks");
  }, [items]);
  return (
    <div className="home">
      <div className="home__banner "></div>
      <menu className="home__menu">
        <p className="mnt-b fz-60 home__menu-title">Топ позиції</p>
        <p className="mnt fz-24 home__menu-tip">
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
  );
};

export default Home;
