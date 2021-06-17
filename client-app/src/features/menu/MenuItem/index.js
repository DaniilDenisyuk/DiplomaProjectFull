import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { orderActions } from "../../order/orderSlice";
import LikeButton from "../../user/LikeButton";
import { getMenuItem } from "../../../common/selectors";
import { ItemCard } from "../../../components/ItemCard";
import "./style.scss";

export const MenuItem = ({ children, className, itemId }) => {
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
      {children}
    </ItemCard>
  );
};

export const MenuItemWithLike = ({ className, itemId }) => {
  return (
    <MenuItem className={className} itemId={itemId}>
      <LikeButton className="menu-item__like-btn" itemId={itemId} />
    </MenuItem>
  );
};

export const MenuItemWithDislike = ({ className, itemId }) => {
  return (
    <div className={className}>
      <MenuItem itemId={itemId} />
      <LikeButton className="menu-item__like-btn" itemId={itemId} />
    </div>
  );
};

export default MenuItem;
