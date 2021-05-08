import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CardSlider from "../../components/CardSlider";
import ItemCard from "../../components/ItemInfoCard";
import Contacts from "../../components/Contacts";
import Delivery from "../../components/Delivery";

import { getMenuItem, getMenuCategories } from "../../common/selectors";
import { orderActions } from "../order/orderSlice";

const ItemCardConnected = (itemId, ...rest) => {
  const item = useSelector(getMenuItem("id", itemId));
  const history = useHistory();
  const dispatch = useDispatch();
  const handleCardClick = () => history.push(`/menu/${itemId}`);
  const handleOrderClick = () => dispatch(orderActions.addItem(itemId));

  return (
    <ItemCard
      item={item}
      onCardClick={handleCardClick}
      onOrderClick={handleOrderClick}
      {...rest}
    />
  );
};

const Home = () => {
  const { sets, rolls, sushi, soups, drinks } = useSelector(getMenuCategories);
  return (
    <div className="home">
      <div className="home__banner "></div>
      <menu className="home__menu">
        <p className="mnt-b fz-60 home__menu-title">Топ позиції</p>
        <p className="mnt fz-24 home__menu-tip">
          Нижче Ви можете ознойомитися з нашим асориментом вишуканих сетів,суші,
          супів та комбо - меню
        </p>
        <li className="home__category category">
          <h2 className="fz-48 category__heading">Сети</h2>
          <Link
            to="/menu/sets"
            className="mnt-m fz-14 orange orange-bd  category__full-link"
          >
            Показати усі
          </Link>
          <CardSlider
            className="category__items"
            items={sets}
            cardComponent={ItemCardConnected}
          />
        </li>
        <li className="home__category category">
          <h2 className="mnt-m fz-48 category__heading">Роли</h2>
          <Link
            to="/menu/rolls"
            className="mnt-m fz-14 orange orange-bd category__full-link"
          >
            Показати усі
          </Link>
          <CardSlider
            className="category__items"
            items={rolls}
            cardComponent={ItemCardConnected}
          />
        </li>
        <li className="home__category category">
          <h2 className="mnt-m fz-48 category__heading">Суші</h2>
          <Link
            to="/menu/sushi"
            className="mnt-m fz-14 orange orange-bd category__full-link"
          >
            Показати усі
          </Link>
          <CardSlider
            className="category__items"
            items={sushi}
            cardComponent={ItemCardConnected}
          />
        </li>
        <li className="home__category category">
          <h2 className="mnt-m fz-48 category__heading">Супи</h2>
          <Link
            to="/menu/soups"
            className="mnt-m fz-14 orange orange-bd category__full-link"
          >
            Показати усі
          </Link>
          <CardSlider
            className="category__items"
            items={soups}
            cardComponent={ItemCardConnected}
          />
        </li>
        <li className="home__category category">
          <h2 className="mnt-m fz-48 category__heading">Супи</h2>
          <Link
            to="/menu/drinks"
            className="mnt-m fz-14 orange orange-bd category__full-link"
          >
            Показати усі
          </Link>
          <CardSlider
            className="category__items"
            items={drinks}
            cardComponent={ItemCardConnected}
          />
        </li>
      </menu>
      <Delivery className="home__delivery" />
      <Contacts className="home__contacts" />
    </div>
  );
};

export default Home;
