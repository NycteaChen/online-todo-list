import callAxios from "./api";
import { SignInRequestType, SignUpRequestType } from "@/types/api";
import {
  SignInResponseType,
  SignUpResponseType,
  ApiResponseType,
} from "@/types/api";

export const signIn = async ({
  email,
  password,
}: SignInRequestType): Promise<SignInResponseType> => {
  const res: SignInResponseType = await callAxios.post(`/users/sign_in`, {
    email,
    password,
  });
  return res;
};

export const signUp = async ({
  email,
  nickname,
  password,
}: SignUpRequestType): Promise<SignUpResponseType> => {
  const res: SignUpResponseType = await callAxios.post(`/users/sign_up`, {
    email,
    nickname,
    password,
  });
  return res;
};

export const signOut = async (): Promise<ApiResponseType> => {
  const res: ApiResponseType = await callAxios.post(`/users/sign_out`);
  return res;
};
