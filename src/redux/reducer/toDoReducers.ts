import { toDoListType, toDoItemType } from "@/types/todo";

const initialState: toDoListType = {
  toDoList: [],
};

type ActionType = { type: string; payload: toDoItemType | toDoItemType[] };

const userReducers = (state = initialState, action: ActionType) => {
  const list = [...state.toDoList];
  switch (action.type) {
    case "SET_TO_DO_LIST":
      return {
        ...action.payload,
      };
    case "DELETE_TO_DO":
      return {
        toDoList: list.filter(
          (e) => e.id !== (action.payload as toDoItemType).id
        ),
      };
    case "TOGGLE_TO_DO": {
      const targetIndex = list.findIndex(
        (e) => e.id === (action.payload as toDoItemType).id
      );
      list[targetIndex].status = !list[targetIndex].status;
      return {
        toDoList: list,
      };
    }
    default:
      return state;
  }
};

export default userReducers;
