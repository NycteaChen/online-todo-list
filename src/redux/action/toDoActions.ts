import { toDoItemType } from "@/types/todo";

export const setToDoList = (list: toDoItemType[]) => {
  const newList = [...list];
  newList.sort((a, b) => b.createTime - a.createTime);

  return {
    type: "SET_TO_DO_LIST",
    payload: {
      toDoList: newList,
    },
  };
};

export const setDeleteToDo = (id: toDoItemType["id"]) => {
  return {
    type: "DELETE_TO_DO",
    payload: {
      id,
    },
  };
};

export const setToggleToDo = (id: toDoItemType["id"]) => {
  return {
    type: "TOGGLE_TO_DO",
    payload: {
      id,
    },
  };
};
