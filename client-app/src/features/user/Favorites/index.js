import { useSelector } from "react-redux";
import { getUserFavorites } from "../../../common/selectors";
import { MenuItemWithDislike } from "../../menu/MenuItem";
//import "./style.scss";

const Favorites = ({ className }) => {
  const itemsId = useSelector(getUserFavorites);
  const cards = itemsId.map((id, index) => (
    <MenuItemWithDislike
      key={`card-${index}`}
      className="category__item"
      itemId={id}
    />
  ));
  return <div className="category">{cards.length ? cards : "No items"}</div>;
};

export default Favorites;
