import { useSelector, useDispatch } from "react-redux";
import { getUserFavorites } from "../../../common/selectors";
import { useEffect } from "react";
import MenuItem from "../../menu/MenuItem";
import { favoritesActions } from "./favoritesSlice";
//import "./style.scss";

const Favorites = ({ className }) => {
  const itemsId = useSelector(getUserFavorites);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(favoritesActions.getFavorites());
  }, [dispatch]);
  const cards = itemsId.map((id, index) => (
    <MenuItem key={`card-${index}`} className="favorites__item" itemId={id} />
  ));
  return <div className="category">{cards.length ? cards : "No items"}</div>;
};

export default Favorites;
