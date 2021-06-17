import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getOrderItemsSum, getOrderItemsId } from "../../../common/selectors";
import OrderItemCard from "../OrderItem";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

import "./style.scss";
import { UserForm } from "../../user/forms";

export const CartButton = ({ className, innerRef, onOpenCart }) => {
  const sum = useSelector(getOrderItemsSum);
  return (
    <button
      ref={innerRef}
      className={cn(className, "cart-button rbt-b")}
      onClick={onOpenCart}
    >
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
      <div className="cart__wrapper">
        <p className=" cart__heading">Кошик</p>
        <div className="cart__items">
          {orderItemsId.length > 0 ? (
            cards
          ) : (
            <p className="cart__empty">Поки немає товарів</p>
          )}
        </div>
        <i className="cart__dash" />
        <div className="cart__result">
          {orderItemsId.length > 0 ? (
            <>
              <div className="cart__sum">Сума: {sum} грн.</div>
              <Button
                className="cart__order-btn"
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
    </div>
  );
};

const CartModal = Modal(Cart);

export const CartModule = ({ className }) => {
  const [cartOpened, setCartOpened] = useState(false);
  const history = useHistory();
  const btnRef = useRef();
  const [marginTop, setMarginTop] = useState("0px");
  const [marginLeft, setMarginLeft] = useState("0px");
  useEffect(() => {
    const { bottom, left } = btnRef.current.getBoundingClientRect();
    setMarginTop(bottom + 20 + "px");
    setMarginLeft(left + 10 + "px");
  }, [btnRef]);
  return (
    <div className={cn(className, "cart-module")}>
      <CartButton
        innerRef={btnRef}
        onOpenCart={() => setCartOpened(true)}
        className="cart-module__button"
      />
      {cartOpened && (
        <CartModal
          style={{ marginTop, marginLeft }}
          className="cart-module__modal"
          onClose={() => setCartOpened(false)}
          onOrderClick={() => {
            setCartOpened(false);
            history.push("/checkout");
          }}
          onToMenuClick={() => {
            setCartOpened(false);
            history.push("/menu");
          }}
        />
      )}
    </div>
  );
};
