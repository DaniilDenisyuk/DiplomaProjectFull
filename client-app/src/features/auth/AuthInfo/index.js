import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cn from "classnames";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

import { useClickOutside } from "../../../common/hooks/useClickOutside";
import { getUsername, getToken, getUserRole } from "../../../common/selectors";
import { authActions } from "../authSlice";
import Button from "../../../components/Button";
import "./style.scss";

const AuthInfo = ({ className, onClose }) => {
  const username = useSelector(getUsername);
  const token = useSelector(getToken);
  const role = useSelector(getUserRole)
    .replace("admin", "Адміністратор")
    .replace("user", "Користувач");
  const history = useHistory();
  const ref = useRef();
  const dispatch = useDispatch();
  useClickOutside(ref, onClose);
  return (
    <div className={cn(className, "auth-info")} ref={ref}>
      <p className="auth-info__username">{username}</p>
      <p className="auth-info__role">{role}</p>
      <Button
        className="auth-info__button"
        secondary
        rounded
        onClick={() => {
          dispatch(authActions.logout(token)).then(() => onClose());
        }}
      >
        Вийти
      </Button>
      <Button
        className="auth-info__button"
        secondary
        rounded
        onClick={() => {
          history.push("/account");
          onClose();
        }}
      >
        До особистого <br /> кабінету
      </Button>
    </div>
  );
};

export default AuthInfo;
