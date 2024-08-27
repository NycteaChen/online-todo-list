export type SignInFieldItemType = {
  label: string;
  name: "email" | "password";
  type: "email" | "password";
};

export type SignUpFieldItemType = {
  label: string;
  name: "email" | "password" | "nickname" | "confirmPassword";
  type: "email" | "password" | "text";
};
