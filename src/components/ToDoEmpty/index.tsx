import { useContext } from "react";
import empty from "@/assets/image/empty.png";
import { ToDoContext } from "@/pages/ToDo";
import { Loading } from "@/components/Loading";

export const ToDoEmpty = () => {
  const { loading } = useContext(ToDoContext);

  return (
    <section className="pt-[44px] flex flex-col space-y-4 items-center relative">
      {loading ? (
        <Loading show={loading} className="min-h-[200px]" />
      ) : (
        <>
          <h4 className="text-base">目前尚無待辦事項</h4>
          <img src={empty} alt="no-to-do" className="max-w-[240px] w-full" />
        </>
      )}
    </section>
  );
};
