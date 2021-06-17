import { Link, Switch, Route, useLocation } from "react-router-dom";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getMenuItemsIdAndCategory } from "../../../common/selectors";
import { MenuItemWithLike } from "../MenuItem";
import "./style.scss";

const MenuCategory = ({ items }) => {
  const cards = items.map((item, index) => (
    <MenuItemWithLike
      key={`card-${index}`}
      className="category__item"
      itemId={item.id}
    />
  ));
  return <div className="category">{cards.length ? cards : "No items"}</div>;
};

const Menu = () => {
  const items = useSelector(getMenuItemsIdAndCategory);

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
    <div className="menu">
      <div className="menu__wrapper __container">
        <Switch>
          <Route
            exact
            path="/menu"
            render={() => (
              <>
                <p className="page-sub-heading center-text">Меню</p>
                <div className="category-cards">
                  <Link to="/menu/sets" className="category-cards__card">
                    <i className="category-cards__img category-cards__img--set" />
                    <span className="category-cards__card-text">Сети</span>
                  </Link>
                  <Link to="/menu/rolls" className="category-cards__card">
                    <i className="category-cards__img category-cards__img--roll" />
                    <span className="category-cards__card-text">Роли</span>
                  </Link>
                  <Link to="/menu/sushi" className="category-cards__card">
                    <i className="category-cards__img category-cards__img--sushi" />
                    <span className="category-cards__card-text">Суші</span>
                  </Link>
                  <Link to="/menu/soups" className="category-cards__card">
                    <i className="category-cards__img category-cards__img--soup" />
                    <span className="category-cards__card-text">Супи</span>
                  </Link>
                  <Link to="/menu/drinks" className="category-cards__card">
                    <i className="category-cards__img category-cards__img--drink" />
                    <span className="category-cards__card-text">Напої</span>
                  </Link>
                </div>
              </>
            )}
          />
          <Route
            path="/menu/sets"
            render={() => (
              <div>
                <p className="page-sub-heading">Сети</p>
                <MenuCategory className="menu__category" items={sets()} />
              </div>
            )}
          />
          <Route
            path="/menu/rolls"
            render={() => (
              <div>
                <p className="page-sub-heading">Роли</p>
                <MenuCategory className="menu__category" items={rolls()} />
              </div>
            )}
          />
          <Route
            path="/menu/sushi"
            render={() => (
              <div>
                <p className="page-sub-heading">Суші</p>
                <MenuCategory className="menu__category" items={sushi()} />
              </div>
            )}
          />
          <Route
            path="/menu/soups"
            render={() => (
              <div>
                <p className="page-sub-heading">Супи</p>
                <MenuCategory className="menu__category" items={soups()} />
              </div>
            )}
          />
          <Route
            path="/menu/drinks"
            render={() => (
              <div>
                <p className="page-sub-heading">Напої</p>
                <MenuCategory className="menu__category" items={drinks()} />
              </div>
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Menu;
