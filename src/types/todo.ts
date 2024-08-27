export interface toDoItemType {
  content: string;
  createTime: number;
  id: string;
  status: boolean;
}

export interface toDoListType {
  toDoList: toDoItemType[];
}
