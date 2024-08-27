import { memo } from "react";

type ToDoTabProps = {
  tabValue: string;
  onClick: (value: string) => void;
};

export const ToDoTab = memo(({ tabValue, onClick }: ToDoTabProps) => {
  const tabList = [
    {
      label: "全部",
      value: "all",
    },
    {
      label: "待完成",
      value: "undo",
    },
    {
      label: "已完成",
      value: "done",
    },
  ];

  return (
    <ul className="h-[53px] flex">
      {tabList.map((tab) => (
        <li
          key={tab.value}
          className={`duration-300 flex items-center justify-center flex-1 font-bold cursor-pointer text-sm border-b-2 border-solid ${
            tabValue === tab.value
              ? "text-primary border-primary"
              : "text-muted-foreground border-[#E5E5E5] hover:text-primary"
          } `}
          onClick={() => onClick(tab.value)}
        >
          {tab.label}
        </li>
      ))}
    </ul>
  );
});
