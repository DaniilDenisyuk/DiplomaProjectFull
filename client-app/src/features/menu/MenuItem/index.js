import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import { orderActions } from "../../order/orderSlice";
import LikeButton from "../../user/LikeButton";
import { getMenuItem } from "../../../common/selectors";
import { ItemCard } from "../../../components/ItemCard";
import "./style.scss";

const MenuItem = ({ className, itemId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const item = useSelector(getMenuItem(itemId));
  const onToCartClick = () => {
    dispatch(orderActions.addItem(item));
  };
  return (
    <ItemCard
      onToCartClick={onToCartClick}
      className={cn(className, "menu-item")}
      item={item}
    >
      <LikeButton
        className="menu-item__like-btn"
        onClick={(e) => e.stopPropagation()}
      />
    </ItemCard>
  );
};

export default MenuItem;
