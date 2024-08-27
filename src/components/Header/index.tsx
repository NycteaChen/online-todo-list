import { useDispatch } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import logo from "@/assets/image/logo.svg";
import { Button } from "@/components/ui/button";
import { signOut } from "@/api/userApi";
import { setUserSignOut } from "@/redux/action/userActions";

export const Header = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  const signOutHandler = async () => {
    const res = await signOut();
    if (res.status) {
      dispatch(setUserSignOut());
      toast({
        title: "登出成功",
        variant: "success",
      });
    } else {
      toast({
        title: res.message,
        variant: "destructive",
      });
    }
  };
  return (
    <header className="w-full">
      <nav className="flex justify-between items-center py-4 max-w-[1320px] mx-auto space-x-5">
        <img src={logo} alt="logo" className="max-w-[242.5px] w-1/2" />
        <Button
          size="icon"
          className="!bg-transparent text-primary text-sm hover:opacity-50 duration-300 p-0 w-auto h-auto"
          onClick={() => {
            signOutHandler();
          }}
        >
          登出
        </Button>
      </nav>
    </header>
  );
};
