import { UserLoginType } from "./user";
import { toDoItemType } from "./todo";

export interface ApiResponseType {
  status: boolean;
  message?: string;
}

export interface SignInRequestType {
  email: string;
  password: string;
}

export interface SignUpRequestType extends SignInRequestType {
  nickname: string;
}

export interface SignInResponseType extends ApiResponseType, UserLoginType {}

export interface SignUpResponseType extends ApiResponseType {
  uid: string;
}

export interface GetToDoResponseType extends ApiResponseType {
  data: toDoItemType[];
}

export interface AddToDoResponseType extends ApiResponseType {
  newToDo: Partial<toDoItemType>;
}
