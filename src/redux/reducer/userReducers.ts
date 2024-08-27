import { UserStateType } from "@/types/user";
import Cookies from "js-cookie";

const initialState: UserStateType = {
  exp: 0,
  token: "",
  nickname: "",
  isLogin: false,
};

type ActionType = { type: string; payload: UserStateType };

const userReducers = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "SET_USER_SIGN_IN":
      Cookies.set("token", action.payload.token);
      return {
        ...action.payload,
      };
    case "SET_USER_SIGN_OUT":
      Cookies.remove("token");
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};

export default userReducers;
