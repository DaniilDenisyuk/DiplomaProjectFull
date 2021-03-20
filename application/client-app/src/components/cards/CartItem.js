import cn from "classnames";
import ItemCounter from "../ItemCounter";
import { useState } from "react";

const CartItem = ({
  className,
  itemInfo: { img, name, size, sizeUnit, price },
}) => {
  const [count, setCount] = useState(1);
  const handleChange = (increment) => {
    let val = count + increment;
    if (val > limit || val < 0) {
      return;
    }
    setCount(val);
  };
  return (
    <li className={cn(className, "cart-item")}>
      <span className="cart-item__delete" />
      <div className="cart-item__img">
        <img src={img[0]} alt={name} />
      </div>
      <section className="cart-item__info">
        <h2 className="cart-item__name">{name}</h2>
        <p className="cart-item__size">{size + sizeUnit + "."}</p>
        <div className="cart-item__total">
          <ItemCounter
            className="cart-item__counter"
            val={count}
            onChange={handleChange}
          />
          <p className="cart-item__cost">{price}.</p>
        </div>
      </section>
    </li>
  );
};

export default CartItem;
