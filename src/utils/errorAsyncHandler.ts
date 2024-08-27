import Cookies from "js-cookie";

export const errorAsyncHandler = ({
  message,
  status,
}: {
  message: string | string[];
  status: boolean;
}) => {
  if (
    (Array.isArray(message) &&
      message.some((e) => e.includes("Authorization"))) ||
    message?.includes("Authorization")
  ) {
    Cookies.remove("token");
    window.location.href = "/auth/sign-in";
  }

  return { message, status };
};
