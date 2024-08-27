export interface UserLoginType {
  token: string;
  nickname: string;
  exp: number;
}

export interface UserStateType extends UserLoginType {
  isLogin: boolean;
}

export enum AuthText {
  SIGN_IN = "登入",
  SIGN_UP = "註冊帳號",
}
