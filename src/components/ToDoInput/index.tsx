import { useState, useEffect, useMemo, useContext } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import addIcon from "@/assets/image/icon/add.svg";
import { useToast } from "@/components/ui/use-toast";
import { getToDos, addToDo } from "@/api/todosApi";
import { setToDoList } from "@/redux/action/toDoActions";
import { ToDoContext } from "@/pages/ToDo";

export const ToDoInput = () => {
  const { setLoading } = useContext(ToDoContext);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const getToDoList = async () => {
    const res = await getToDos();
    if (res.status) {
      dispatch(setToDoList(res.data));
    } else {
      toast({
        title: res.message,
        variant: "destructive",
      });
    }
  };

  const addToDoHandler = async () => {
    setBtnLoading(true);
    setLoading(true);

    const res = await addToDo(value);
    if (res.status) {
      await getToDoList();
      setValue("");
    } else {
      toast({
        title: res.message,
        variant: "destructive",
      });
    }

    setBtnLoading(false);
    setLoading(false);
  };

  const btnDisabled = useMemo(() => {
    return btnLoading || !value?.trim();
  }, [btnLoading, value]);

  useEffect(() => {
    (async () => {
      await getToDoList();
      setLoading(false);
    })();
  }, []);

  return (
    <div className="relative">
      <Input
        className="pr-[52px] h-[47px] text-base component-shadow"
        placeholder="新增待辦事項"
        value={value}
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
        }}
      />
      <Button
        size="icon"
        className="!absolute top-1/2 bottom-1/2 -translate-y-1/2 right-1"
        disabled={btnDisabled}
        onClick={() => addToDoHandler()}
      >
        <img src={addIcon} alt="alt" />
      </Button>
    </div>
  );
};
