import React from "react";
import cn from "classnames";
import Button from "../buttons/Button";
import "./menuItem.scss";

function menuItem({ className, itemInfo, linkTo, onBasketClick }) {
  const { name, desctipion, imgSrc, price, newPrice } = itemInfo;
  const priceBlock = newPrice ? (
    <React.Fragment>
      <p className="menu-item__new-price">{newPrice}</p>
      <p className="menu-item__old-price">{price}</p>
    </React.Fragment>
  ) : (
    price
  );
  return (
    <section className={cn("menu-item", className)}>
      <div className="menu-item__img">
        <img src={imgSrc} alt={name + " фото"}></img>
      </div>
      <div className="menu-item__info">
        <h2 className="menu-item__name">{name}</h2>
        <p className="menu-item__description">{desctipion}</p>
        <div className="menu-item__row">
          <div className="menu-item__price">{priceBlock}</div>
          <Button
            onClick={onBasketClick}
            type="button"
            className="menu-item__to-basket"
          >
            В корзину
          </Button>
        </div>
      </div>
    </section>
  );
}

export default menuItem;
