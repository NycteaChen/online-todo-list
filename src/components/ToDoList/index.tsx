import { useMemo, useState, memo } from "react";
import { useSelector } from "react-redux";
import { toDoListType } from "@/types/todo";
import { ToDoTab } from "@/components/ToDoTab";
import { ToDoItem } from "@/components/ToDoItem";
import { ToDoEmpty } from "@/components/ToDoEmpty";

export const ToDoList = memo(() => {
  const [tab, setTab] = useState("all");

  const toDoList = useSelector((state: { toDo: toDoListType }) => {
    return state.toDo.toDoList;
  });

  const renderToDoList = useMemo(() => {
    switch (tab) {
      case "undo":
        return toDoList.filter((e) => !e.status);
      case "done":
        return toDoList.filter((e) => e.status);
      default:
        return toDoList;
    }
  }, [tab, toDoList]);

  const clickTab = (value: string) => {
    setTab(value);
  };

  const tabProps = useMemo(() => {
    return { tabValue: tab, onClick: clickTab };
  }, [tab]);

  return (
    <>
      {toDoList.length ? (
        <section className="bg-white component-shadow rounded-[10px] text-sm">
          <ToDoTab {...tabProps} />
          <ul className="pt-2 px-6 relative">
            {renderToDoList.length ? (
              renderToDoList.map((item) => (
                <ToDoItem key={item.id} item={item} status={item.status} />
              ))
            ) : (
              <li className="text-center pt-5">無相關代辦事項</li>
            )}
          </ul>
          <footer className="text-center py-4">
            {`尚有 ${toDoList.filter((e) => !e.status).length} 個待完成項目`}
          </footer>
        </section>
      ) : (
        <ToDoEmpty />
      )}
    </>
  );
});
