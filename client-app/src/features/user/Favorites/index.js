import { useSelector, useDispatch } from "react-redux";
import { getUserFavorites, getToken } from "../../../common/selectors";
import { useEffect } from "react";
import MenuItem from "../../menu/MenuItem";
import { favoritesActions } from "./favoritesSlice";
//import "./style.scss";

const Favorites = ({ className }) => {
  const token = useSelector(getToken);
  const itemsId = useSelector(getUserFavorites);
  console.log(itemsId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(favoritesActions.getFavorites(token));
  }, [dispatch, token]);
  const cards = itemsId.map((item, index) => (
    <MenuItem
      key={`card-${index}`}
      className="favorites__item"
      itemId={item.item_id}
    />
  ));
  return <div className="category">{cards.length ? cards : "No items"}</div>;
};

export default Favorites;
