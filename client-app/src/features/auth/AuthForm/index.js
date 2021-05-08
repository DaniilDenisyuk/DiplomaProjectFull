import { useDispatch } from "react-redux";
import { authActions } from "../authSlice";
import { AuthForm } from "../../../components/#forms/AuthForm";

import Modal from "../../../components/Modal";

export const Auth = () => {
  const dispatch = useDispatch();
  const handleAuth = ({ login, password }) => {
    dispatch(authActions.login(login, password));
  };
  return <AuthForm handleSubmit={handleAuth} />;
};

export const AuthModal = Modal(Auth);
