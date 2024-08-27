import callAxios from "./api";
import { toDoItemType } from "@/types/todo";
import {
  ApiResponseType,
  GetToDoResponseType,
  AddToDoResponseType,
} from "@/types/api";

export const getToDos = async (): Promise<GetToDoResponseType> => {
  const res: GetToDoResponseType = await callAxios.get(`/todos/`);
  return res;
};

export const addToDo = async (
  content: toDoItemType["content"]
): Promise<AddToDoResponseType> => {
  const res: AddToDoResponseType = await callAxios.post(`/todos`, { content });
  return res;
};

export const updateToDo = async ({ id, content }: Partial<toDoItemType>) => {
  const res = await callAxios.put(`/todos/${id}`, { content });
  return res;
};

export const deleteToDo = async (
  id: toDoItemType["id"]
): Promise<ApiResponseType> => {
  const res: ApiResponseType = await callAxios.delete(`/todos/${id}`);
  return res;
};

export const toggleToDo = async (
  id: toDoItemType["id"]
): Promise<ApiResponseType> => {
  const res: ApiResponseType = await callAxios.patch(`/todos/${id}/toggle`);
  return res;
};
