import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import { getOrderItemCount, getMenuItem } from "../../../common/selectors";
import { orderActions } from "../orderSlice";
import ItemCounter from "../../../components/ItemCounter";

const OrderItemCard = ({ className, itemId }) => {
  const item = useSelector(getMenuItem(itemId));
  const count = useSelector(getOrderItemCount(itemId));
  const dispatch = useDispatch();
  return (
    <section className={cn(className, "order-item")}>
      <div className="order-item__img">
        <img src={item.imgs[0]} alt={item.name} />
      </div>
      <div className="order-item__info">
        <h2 className="order-item__name">{item.name}</h2>
        <p className="order-item__size">{item.size}</p>
        <div className="row">
          <ItemCounter
            className="order-item__counter"
            count={count}
            onChange={(value) =>
              dispatch(orderActions.changeCount(item.id, value))
            }
            min={1}
            max={10}
          />
          <p className="order-item__price">{item.price} грн.</p>
        </div>
      </div>
    </section>
  );
};

export default OrderItemCard;
