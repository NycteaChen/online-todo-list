import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setUserSignOut } from "@/redux/action/userActions";
import { UserStateType } from "@/types/user";

/* middleware: https://stackoverflow.com/questions/45903584/react-middleware-auth-component-with-react-router */

type AuthGuardProps = {
  Component: React.ReactNode;
  needAuth: boolean;
};

export const AuthGuard = ({ Component, needAuth }: AuthGuardProps) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: { user: UserStateType }) => {
    return state.user.isLogin;
  });
  const token = Cookies.get("token");

  const validLogin = isLogin && token;

  if (!validLogin) {
    dispatch(setUserSignOut());
  }

  if (needAuth) {
    return validLogin ? Component : <Navigate to="/auth/sign-in" />;
  }
  return validLogin ? <Navigate to="/" /> : Component;
};
