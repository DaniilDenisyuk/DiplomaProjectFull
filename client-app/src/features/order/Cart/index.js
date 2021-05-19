import cn from "classnames";
import { useSelector } from "react-redux";
import { getOrderSum, getOrderItems } from "../../../common/selectors";
import OrderItemCard from "../OrderItemCard";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

import "./style.scss";

export const CartButton = ({ className, onOpenCart }) => {
  const sum = useSelector(getOrderSum);
  return (
    <button className={cn(className, "cart-button rbt-b")} onClick={onOpenCart}>
      {sum}&#8372;
    </button>
  );
};

const Cart = ({ onOrderClick }) => {
  const sum = useSelector(getOrderSum);
  const orderItems = useSelector(getOrderItems);
  const cards = orderItems.map((item) => (
    <OrderItemCard
      key={`item-${item.id}`}
      className="cart__item"
      itemId={item.id}
    />
  ));
  return (
    <div className="cart">
      <p className="mnt-m cart__heading">Кошик</p>
      <div className="cart__items">
        {cards && cards.length ? (
          cards
        ) : (
          <p className="mnt-m cart__empty">Поки немає товарів</p>
        )}
      </div>
      <div className="cart__result">
        <div className="cart__sum">Сума: {sum} грн.</div>
        <Button
          className="mnt-m cart__order-btn"
          rounded
          primary
          onClick={onOrderClick}
        >
          Замовити
        </Button>
      </div>
    </div>
  );
};

const ModalBody = Modal(Cart);

export const CartModal = ({ className, onClose, ...rest }) => (
  <ModalBody
    className={cn(className, "cart-modal")}
    onClose={onClose}
    {...rest}
  />
);
