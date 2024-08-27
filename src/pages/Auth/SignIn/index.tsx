import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, redirect } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schema/user";
import { setUserSignIn } from "@/redux/action/userActions";
import { signIn } from "@/api/userApi";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthText } from "@/types/user";
import { SignInFieldItemType } from "@/types/form";

export const SignIn = () => {
  const [btnDisabled, setBtnDisabled] = useState(false);

  const dispatch = useDispatch();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setBtnDisabled(true);
    const res = await signIn(values);
    if (res.status) {
      dispatch(setUserSignIn(res));

      redirect("/");
      toast({
        variant: "success",
        title: "登入成功，歡迎回來",
      });
    } else {
      toast({
        variant: "destructive",
        title: `登入失敗，${res.message}`,
      });
    }

    setBtnDisabled(false);
  };

  const fieldList: SignInFieldItemType[] = [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "密碼",
      name: "password",
      type: "password",
    },
  ];
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-1 w-full"
        >
          {fieldList.map((item) => (
            <FormField
              control={form.control}
              name={item.name}
              key={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`請輸入${item.label}`}
                      type={item.type}
                      autoComplete="on"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            className="mx-auto block"
            disabled={btnDisabled}
          >
            {AuthText.SIGN_IN}
          </Button>
        </form>
      </Form>
      <Link to="/auth/sign-up" className="mt-6">
        {AuthText.SIGN_UP}
      </Link>
    </>
  );
};
