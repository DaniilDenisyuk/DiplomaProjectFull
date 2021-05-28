import cn from "classnames";
import { useState, useRef } from "react";
import Button from "../../../components/Button";
import { useClickOutside } from "../../../common/hooks";
import "./style.scss";

const HistoryItem = ({ className, item }) => {
  const { id, date, price, items } = item;
  const [shuffled, setShuffled] = useState(true);
  const ref = useRef();
  useClickOutside(ref, () => {
    if (!shuffled) {
      setShuffled(true);
    }
  });
  const { photos, itemsInfo } = items.reduce(
    (accumulator, { id, name, count, img }) => {
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
    <div className="history-item__wrapper">
      {itemInfo}
      <p className="history-item__price">{items[i].price}грн.</p>
      <div className="history-item__photo">{photos[i]}</div>
      <button className="history-item__like-btn">+ в обране</button>
      <Button
        className="history-item__cart-btn history-item__button"
        secondary
        rounded
        onClick={() => {}}
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
            <p className="history-item__date">{date}</p>
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
          <p className="history-item__price">{price}грн.</p>
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
        <div className="history-item__items-list">
          {listItems}
          <div className="history-item__buttons">
            <Button
              className="history-item__button"
              primary
              rounded
              onClick={(e) => {
                e.stopPropagation();
                setShuffled(true);
              }}
            >
              Згорнути
            </Button>
            <Button className="history-item__button" primary rounded>
              Замовити все
            </Button>
          </div>
        </div>
      )}
    </li>
  );
};

export default HistoryItem;
