import LikeButtonGeneric from "../../../components/LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { getIsItemInFavorites, getToken } from "../../../common/selectors";
import { favoritesActions } from "../Favorites/favoritesSlice";

const LikeButton = ({ className, itemId }) => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const isFavorite = useSelector(getIsItemInFavorites(itemId));
  return (
    <LikeButtonGeneric
      className={className}
      onClick={() => {
        if (isFavorite)
          dispatch(favoritesActions.deleteFromFavorites(token, itemId));
        else {
          dispatch(favoritesActions.addToFavorites(token, itemId));
        }
      }}
      active={isFavorite}
    />
  );
};

export default LikeButton;
