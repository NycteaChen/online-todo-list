import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import { UserStateType } from "@/types/user";
import { Header } from "@/components/Header";
import { ToDoList } from "@/components/ToDoList";
import { ToDoInput } from "@/components/ToDoInput";

type ToDoContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ToDoContext = createContext<ToDoContextType>({
  loading: true,
  setLoading: () => {},
});

export const ToDo = () => {
  const [loading, setLoading] = useState(true);
  const nickname = useSelector((state: { user: UserStateType }) => {
    return state.user.nickname;
  });

  return (
    <>
      <main className="home h-full w-full min-h-[100dvh] px-8 pb-12">
        <Header />
        <section className="space-y-4 max-w-[500px] mx-auto">
          <h2 className="word-break text-center font-bold text-xl lg:text-2xl">{`${nickname}的代辦`}</h2>
          <ToDoContext.Provider value={{ loading, setLoading }}>
            <ToDoInput />
            <ToDoList />
          </ToDoContext.Provider>
        </section>
      </main>
    </>
  );
};
