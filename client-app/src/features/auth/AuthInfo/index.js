import { useSelector, useDispatch } from "react-redux";
import cn from "classnames";
import { useRef } from "react";
import { useHistory } from "react-router-dom";

import { useClickOutside } from "../../../common/hooks/useClickOutside";
import { getUsername, getUserRole } from "../../../common/selectors";
import { authActions } from "../authSlice";
import Button from "../../../components/Button";
import "./style.scss";

const AuthInfo = ({ className, onClose }) => {
  const username = useSelector(getUsername);
  const role = useSelector(getUserRole);
  const history = useHistory();
  const ref = useRef();
  const dispatch = useDispatch();
  useClickOutside(ref, onClose);
  return (
    <div className={cn(className, "auth-info")} ref={ref}>
      <p className="auth-info__username">{username}</p>
      <p className="auth-info__role">
        {role.replace("admin", "Адміністратор").replace("user", "Користувач")}
      </p>
      <Button
        className="auth-info__button"
        secondary
        rounded
        onClick={() => {
          onClose();
          dispatch(authActions.logout());
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
