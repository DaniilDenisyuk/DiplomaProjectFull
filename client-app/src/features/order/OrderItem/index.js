import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import { getOrderItem } from "../../../common/selectors";
import { orderActions } from "../orderSlice";
import ItemCounter from "../../../components/ItemCounter";
import RemoveButton from "../../../components/RemoveButton";
import "./style.scss";

const OrderItemCard = ({ className, itemId }) => {
  const item = useSelector(getOrderItem(itemId));
  const dispatch = useDispatch();
  return (
    <section className={cn(className, "order-item")}>
      <div className="order-item__img">
        <img src={item.imgs[0]} alt={item.name} />
      </div>
      <div className="order-item__info">
        <h2 className="order-item__name">{item.name}</h2>
        <p className="order-item__size">{item.size}</p>
        <div className="order-item__row">
          <ItemCounter
            className="order-item__counter"
            count={item.count}
            onChange={(value) =>
              dispatch(orderActions.changeCount(itemId, value))
            }
            min={1}
            max={10}
          />
          <p className="order-item__price">{item.price} грн.</p>
        </div>
      </div>
      <RemoveButton
        className="order-item__delete"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(orderActions.removeItem(itemId));
        }}
      />
    </section>
  );
};

export default OrderItemCard;
