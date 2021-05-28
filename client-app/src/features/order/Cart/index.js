import cn from "classnames";
import { useSelector } from "react-redux";
import { getOrderItemsSum, getOrderItemsId } from "../../../common/selectors";
import OrderItemCard from "../OrderItem";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

import "./style.scss";

export const CartButton = ({ className, onOpenCart }) => {
  const sum = useSelector(getOrderItemsSum);
  return (
    <button className={cn(className, "cart-button rbt-b")} onClick={onOpenCart}>
      {sum}&#8372;
    </button>
  );
};

const Cart = ({ onOrderClick, onToMenuClick }) => {
  const sum = useSelector(getOrderItemsSum);
  const orderItemsId = useSelector(getOrderItemsId);
  const cards = orderItemsId.map((id) => (
    <OrderItemCard key={`item-${id}`} className="cart__item" itemId={id} />
  ));
  return (
    <div className="cart">
      <p className="mnt-m cart__heading">Кошик</p>
      <div className="cart__items">
        {orderItemsId.length > 0 ? (
          cards
        ) : (
          <p className="mnt-m cart__empty">Поки немає товарів</p>
        )}
      </div>
      <div className="cart__result">
        {orderItemsId.length > 0 ? (
          <>
            <div className="cart__sum">Сума: {sum} грн.</div>
            <Button
              className="mnt-m cart__order-btn"
              rounded
              primary
              onClick={onOrderClick}
            >
              Оформити
            </Button>
          </>
        ) : (
          <Button
            className="cart__to-menu"
            rounded
            primary
            onClick={onToMenuClick}
          >
            Перейти в меню
          </Button>
        )}
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
