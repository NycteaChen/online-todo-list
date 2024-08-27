import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/Loading";
import check from "@/assets/image/icon/check.svg";
import remove from "@/assets/image/icon/delete.svg";
import { toDoItemType } from "@/types/todo";
import { toggleToDo, deleteToDo } from "@/api/todosApi";
import { setDeleteToDo, setToggleToDo } from "@/redux/action/toDoActions";

type ToDoItemProps = {
  item: toDoItemType;
  status: toDoItemType["status"];
};

export const ToDoItem = memo(({ item, status }: ToDoItemProps) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const toggleToDoHandler = async (id: string) => {
    setLoading(true);

    const res = await toggleToDo(id);
    if (res.status) {
      dispatch(setToggleToDo(id));
    } else {
      toast({
        title: res.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  const deleteToDoHandler = async (id: string) => {
    setLoading(true);

    const res = await deleteToDo(id);
    if (res.status) {
      dispatch(setDeleteToDo(id));
    } else {
      toast({
        title: res.message,
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <li
      className={`relative flex items-center space-x-4 py-4 border-solid border-b border-[#E5E5E5] ${
        status ? "text-muted-foreground line-through" : "text-primary"
      }`}
      key={item.id}
    >
      {status ? (
        <img
          src={check}
          alt="check"
          className="is-btn"
          onClick={() => toggleToDoHandler(item.id)}
        />
      ) : (
        <div
          className="w-5 h-5 border border-muted-foreground rounded-[5px] is-btn"
          onClick={() => toggleToDoHandler(item.id)}
        />
      )}
      <span className="flex-1">{item.content}</span>
      <img
        src={remove}
        alt="delete"
        className="is-btn"
        onClick={() => deleteToDoHandler(item.id)}
      />
      <Loading show={loading} className="!m-0 bg-white/50" />
    </li>
  );
});
