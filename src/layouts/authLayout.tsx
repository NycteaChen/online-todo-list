import { Outlet } from "react-router-dom";
import logo from "@/assets/image/logo.svg";
import banner from "@/assets/image/banner.png";

export const AuthLayout = () => {
  return (
    <main className="p-[48px_32px] bg-[#FFD370] min-h-[100dvh] overflow-y-auto flex flex-col space-y-4 items-center justify-center lg:flex-row lg:space-y-0 lg:space-x-[106px] lg:p-6">
      <section className="flex flex-col space-y-4 items-center justify-center max-w-[386px]">
        <img src={logo} alt="logo" />
        <img className="hidden lg:block" src={banner} alt="banner" />
      </section>
      <section className="max-w-[320px] mx-auto flex flex-col justify-center items-center w-full">
        <h1 className="text-xl font-bold w-full text-center lg:text-2xl mb-6">
          最實用的線上代辦事項服務
        </h1>
        <Outlet />
      </section>
    </main>
  );
};
