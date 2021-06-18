import cn from "classnames";
import { useState, useRef } from "react";
import Button from "../../../components/Button";
import { useClickOutside } from "../../../common/hooks";
import "./style.scss";
import { useDispatch } from "react-redux";
import { orderActions } from "../../order/orderSlice";
import { favoritesActions } from "../Favorites/favoritesSlice";

const dateToDotsFormat = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-GB").replace(/\//g, ".");
};

const HistoryItem = ({ className, item }) => {
  const { id, customer_name, customer_phone, order_date, order_price, items } =
    item;
  const dispatch = useDispatch();
  const [shuffled, setShuffled] = useState(true);
  const ref = useRef();
  useClickOutside(ref, () => {
    if (!shuffled) {
      setShuffled(true);
    }
  });
  const { photos, itemsInfo } = items.reduce(
    (accumulator, { id, name, price, count, img }) => {
      accumulator.photos.push(
        <img
          src={img}
          alt={`${name} фото`}
          className="history-item__photo"
          key={`photo-${id}`}
        />
      );
      accumulator.itemsInfo.push(
        <p className="history-item__item-info" key={`info-${id}`}>
          <span className="history-item__item-name">{name}</span>
          <span className="history-item__item-count">
            <span>x</span> {count}
          </span>
        </p>
      );
      return accumulator;
    },
    { photos: [], itemsInfo: [] }
  );

  const listItems = itemsInfo.map((itemInfo, i) => (
    <div className="history-item__wrapper" key={`item-${i}`}>
      <div className="history-item__info"> {itemInfo}</div>
      <p className="history-item__price">{items[i].price}грн.</p>
      <div className="history-item__photo">{photos[i]}</div>
      <button
        className="history-item__like-btn"
        onClick={() => {
          //dispatch(favoritesActions.addToFavorites(items[i].id));
        }}
      >
        <span>+</span> в обране
      </button>
      <Button
        className="history-item__cart-btn history-item__button"
        secondary
        rounded
        //onClick={() => dispatch(orderActions.addItem(items[i].id))}
      >
        В корзину
      </Button>
    </div>
  ));
  return (
    <li
      className={cn(className, "history-item")}
      onClick={() => setShuffled(false)}
      ref={ref}
    >
      {shuffled ? (
        <div className="history-item__wrapper">
          <div className="history-item__info">
            <p className="history-item__date">{dateToDotsFormat(order_date)}</p>
            <div className="history-item__items-list">
              {itemsInfo.length > 3 ? (
                <>
                  {itemsInfo.slice(0, 3)}
                  <p className="history-item__hiden-items">
                    +{itemsInfo.length - 3} страва(и)
                  </p>
                </>
              ) : (
                itemsInfo
              )}
            </div>
          </div>
          <p className="history-item__price">{order_price}грн.</p>
          <div className="history-item__photos">
            {photos.length > 3 ? (
              <>
                {photos.slice(0, 3)}
                <p className="history-item__hiden-photos">
                  <span />
                </p>
              </>
            ) : (
              photos
            )}
          </div>
        </div>
      ) : (
        <>
          <p className="history-item__date">{dateToDotsFormat(order_date)}</p>
          <div className="history-item__items-list">{listItems}</div>
          <span className="history-item__dash"></span>
          <div className="history-item__result">
            <div className="history-item__order-info">
              <p>
                ID замовлення: <span>{id}</span>
              </p>
              <p>
                Ім'я замовника: <span>{customer_name}</span>
              </p>
              <p>
                Телефон замовника: <span>{customer_phone}</span>
              </p>
            </div>
            <p className="history-item__order-sum">
              Сума: <span>{order_price}</span> грн
            </p>
            <Button className="history-item__button" primary rounded>
              Повторити
            </Button>
          </div>
        </>
      )}
    </li>
  );
};

export default HistoryItem;
