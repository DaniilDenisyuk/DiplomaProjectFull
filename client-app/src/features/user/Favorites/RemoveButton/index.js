import RemoveButtonGeneric from "../../../../components/RemoveButton";
import { useDispatch } from "react-redux";
import { favoritesActions } from "../favoritesSlice";

const RemoveButton = ({ className, itemId }) => {
  const dispatch = useDispatch();
  return (
    <RemoveButtonGeneric
      className={className}
      onClick={() => {
        dispatch(favoritesActions.deleteFromFavorites(itemId));
      }}
    />
  );
};

export default RemoveButton;
