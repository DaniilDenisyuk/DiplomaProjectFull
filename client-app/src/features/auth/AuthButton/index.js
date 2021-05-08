import { useSelector } from "react-redux";
import { getIsLoggedIn, getUsername } from "../../../common/selectors";
import cn from "classnames";
import "./style.scss";

export const AuthButton = ({ className, text, onOpenLogin, onOpenInfo }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const username = useSelector(getUsername);
  const handleClick = () => {
    isLoggedIn ? onOpenInfo() : onOpenLogin();
  };
  return (
    <button className={cn(className, "login-btn")} onClick={handleClick}>
      {isLoggedIn ? username : text}
    </button>
  );
};
