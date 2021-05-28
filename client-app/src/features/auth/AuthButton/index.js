import { useSelector } from "react-redux";
import cn from "classnames";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import AuthInfo from "../AuthInfo";
import { getIsLoggedIn, getUsername } from "../../../common/selectors";
import "./style.scss";

export const AuthButton = ({ className }) => {
  const [infoOpened, setInfoOpened] = useState(false);
  const history = useHistory();

  const isLoggedIn = useSelector(getIsLoggedIn);
  const username = useSelector(getUsername);

  const handleClick = () => {
    isLoggedIn
      ? setInfoOpened(true)
      : history.push("/login", { background: history.location });
  };
  return (
    <div className={cn(className, "auth")}>
      <button className="auth__btn" onClick={handleClick}>
        {isLoggedIn ? username : "Увійти"}
      </button>
      {infoOpened && (
        <AuthInfo
          onClose={() => setInfoOpened(false)}
          className="auth__info dropin"
        />
      )}
    </div>
  );
};
