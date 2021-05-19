import cn from "classnames";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { orderActions } from "../../order/orderSlice";
import "./style.scss";

export const ItemCard = ({ className, item, onCardClick, onToCartClick }) => (
  <section onClick={onCardClick} className={cn(className, "item-card")}>
    <div className="item-card__img">
      <img src={item.image} alt={item.name} />
    </div>
    <h2 className="item-card__name">{item.name}</h2>

    <p className="item-card__info">
      {item.description || (
        <>
          <span>{item.size}</span>
          <span>{item.energy}</span>
        </>
      )}
    </p>
    <div className="item-card__row">
      <p className="item-card__price">{item.price} грн.</p>
      <Button
        className="item-card__add-button"
        rounded
        secondary
        onClick={(e) => {
          e.stopPropagation();
          onToCartClick();
        }}
      >
        В кошик
      </Button>
    </div>
  </section>
);

export const ItemCardSmart = ({ className, item }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const onCardClick = () => {
    history.push(`/menu/${item.id}`);
  };
  const onToCartClick = () => {
    dispatch(orderActions.addItem(item));
  };
  return (
    <ItemCard
      onCardClick={onCardClick}
      onToCartClick={onToCartClick}
      className={className}
      item={item}
    />
  );
};

export default ItemCard;
