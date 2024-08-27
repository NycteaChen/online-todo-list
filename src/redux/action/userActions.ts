import { UserLoginType } from "@/types/user";

export const setUserSignIn = ({
  token = "",
  nickname = "",
  exp = 0,
}: UserLoginType) => {
  return {
    type: "SET_USER_SIGN_IN",
    payload: {
      token,
      nickname,
      exp,
      isLogin: true,
    },
  };
};

export const setUserSignOut = () => {
  return {
    type: "SET_USER_SIGN_OUT",
    payload: {
      token: "",
      nickname: "",
      exp: 0,
      isLogin: false,
    },
  };
};
