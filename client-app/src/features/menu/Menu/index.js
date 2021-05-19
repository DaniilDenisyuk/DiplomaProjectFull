import { Link, Switch, Route, useLocation } from "react-router-dom";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getMenuItems } from "../../../common/selectors";
import { ItemCardSmart } from "../ItemCard";
import "./style.scss";

const Category = ({ items }) => {
  const cards = items.map((item, index) => (
    <ItemCardSmart
      key={`card-${index}`}
      className="category__item"
      item={item}
    ></ItemCardSmart>
  ));
  return <div className="category">{cards.length ? cards : "No items"}</div>;
};

const Menu = () => {
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
    <div className="menu">
      <Switch>
        <Route
          exact
          path="/menu"
          render={() => (
            <div className="category-cards">
              <Link to="/menu/sets" className="category-cards__card">
                <div className="category-cards__card-bg" />
                <span className="category-cards__card-text">Сети</span>
              </Link>
              <Link to="/menu/rolls" className="category-cards__card">
                <div className="category-cards__card-bg" />
                <span className="category-cards__card-text">Роли</span>
              </Link>
              <Link to="/menu/sushi" className="category-cards__card">
                <div className="category-cards__card-bg" />
                <span className="category-cards__card-text">Суші</span>
              </Link>
              <Link to="/menu/soups" className="category-cards__card">
                <div className="category-cards__card-bg" />
                <span className="category-cards__card-text">Супи</span>
              </Link>
              <Link to="/menu/drinks" className="category-cards__card">
                <div className="category-cards__card-bg" />
                <span className="category-cards__card-text">Напої</span>
              </Link>
            </div>
          )}
        />
        <Route path="/menu/sets" render={() => <Category items={sets()} />} />
        <Route path="/menu/rolls" render={() => <Category items={rolls()} />} />
        <Route path="/menu/sushi" render={() => <Category items={sushi()} />} />
        <Route path="/menu/soups" render={() => <Category items={soups()} />} />
        <Route
          path="/menu/drinks"
          render={() => <Category items={drinks()} />}
        />
      </Switch>
    </div>
  );
};

export default Menu;
