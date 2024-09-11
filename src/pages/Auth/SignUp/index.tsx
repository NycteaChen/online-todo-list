import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/user";
import { signUp } from "@/api/userApi";
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
import { SignUpFieldItemType } from "@/types/form";

export const SignUp = () => {
  const navigate = useNavigate();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setBtnDisabled(true);

    const res = await signUp(values);
    if (res?.status) {
      navigate("/auth/sign-in");
      toast({
        variant: "success",
        title: "註冊成功，請登入",
      });
    } else {
      toast({
        variant: "destructive",
        title: `註冊失敗，${res?.message}`,
      });
    }

    setBtnDisabled(false);
  };

  const fieldList: SignUpFieldItemType[] = [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "暱稱",
      name: "nickname",
      type: "text",
    },
    {
      label: "密碼",
      name: "password",
      type: "password",
    },
    {
      label: "確認密碼",
      name: "confirmPassword",
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
                      data-testid={`${item.name}-input`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage data-testid={`${item.name}-message`} />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            className="mx-auto block"
            data-testid="submit-button"
            disabled={btnDisabled}
          >
            {AuthText.SIGN_UP}
          </Button>
        </form>
      </Form>
      <Link to="/auth/sign-in" className="mt-6">
        {AuthText.SIGN_IN}
      </Link>
    </>
  );
};
