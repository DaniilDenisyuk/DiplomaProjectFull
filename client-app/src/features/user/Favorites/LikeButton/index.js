import LikeButtonGeneric from "../../../../components/LikeButton";
import { useDispatch, useSelector } from "react-redux";
import { getIsItemInFavorites } from "../../../../common/selectors";
import { favoritesActions } from "../favoritesSlice";

const LikeButton = ({ className, itemId }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(getIsItemInFavorites(itemId));
  return (
    <LikeButtonGeneric
      className={className}
      active={isFavorite}
      onClick={() => {
        if (isFavorite) dispatch(favoritesActions.deleteFromFavorites(itemId));
        else {
          dispatch(favoritesActions.addToFavorites(itemId));
        }
      }}
    />
  );
};

export default LikeButton;
