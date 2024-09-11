import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "@/redux/store";
import { SignUp } from "@/pages/Auth/SignUp";
import { signUp } from "@/api/userApi";

jest.mock("@/api/userApi");

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options });

describe("Sign up form", () => {
  let getByTestId: any;
  let queryByTestId: any;
  let submitButton: any;

  beforeEach(() => {
    const utils = customRender(<SignUp />);
    getByTestId = utils.getByTestId;
    queryByTestId = utils.queryByTestId;
    submitButton = getByTestId("submit-button");
  });

  describe("Check form rule", () => {
    it("Wrong email should show an error message", async () => {
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("email-message")).toHaveTextContent(
          "此欄位不可為空"
        );
      });

      fireEvent.change(getByTestId("email-input"), {
        target: { value: "invalidMail" },
      });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("email-message")).toHaveTextContent("信箱格式錯誤");
      });

      fireEvent.change(getByTestId("email-input"), {
        target: { value: "valid@email.com" },
      });
      await waitFor(() => {
        expect(queryByTestId("email-message")).toBeNull();
      });
    });

    it("Wrong nickname should show an error message", async () => {
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("nickname-message")).toHaveTextContent(
          "此欄位不可為空"
        );
      });

      fireEvent.change(getByTestId("nickname-input"), {
        target: {
          value: "01234567890123456789012345678901234567890123456789a",
        },
      });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("nickname-message")).toHaveTextContent(
          "暱稱最多 50 字"
        );
      });

      fireEvent.change(getByTestId("nickname-input"), {
        target: { value: "myNickname" },
      });
      await waitFor(() => {
        expect(queryByTestId("nickname-message")).toBeNull();
      });
    });

    it("Wrong password length should show an error message", async () => {
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("password-message")).toHaveTextContent(
          "密碼至少 6 個字元"
        );
      });

      fireEvent.change(getByTestId("password-input"), {
        target: { value: "abcde" },
      });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("password-message")).toHaveTextContent(
          "密碼至少 6 個字元"
        );
      });

      fireEvent.change(getByTestId("password-input"), {
        target: { value: "abcdefgh123456789" },
      });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("password-message")).toHaveTextContent(
          "密碼最多 16 個字元"
        );
      });

      fireEvent.change(getByTestId("password-input"), {
        target: { value: "validPassword123" },
      });
      await waitFor(() => {
        expect(queryByTestId("password-message")).toBeNull();
      });
    });

    it("Wrong confirmPassword length should show an error message", async () => {
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("confirmPassword-message")).toHaveTextContent(
          "確認密碼至少 6 個字元"
        );
      });

      fireEvent.change(getByTestId("confirmPassword-input"), {
        target: { value: "abcde" },
      });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("confirmPassword-message")).toHaveTextContent(
          "確認密碼至少 6 個字元"
        );
      });

      fireEvent.change(getByTestId("confirmPassword-input"), {
        target: { value: "abcdefgh123456789" },
      });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("confirmPassword-message")).toHaveTextContent(
          "密碼最多 16 個字元"
        );
      });

      fireEvent.change(getByTestId("password-input"), {
        target: { value: "abc123" },
      });

      fireEvent.change(getByTestId("confirmPassword-input"), {
        target: { value: "abc789" },
      });

      await waitFor(() => {
        expect(getByTestId("confirmPassword-message")).toHaveTextContent(
          "確認密碼與密碼不一致"
        );
      });

      fireEvent.change(getByTestId("confirmPassword-input"), {
        target: { value: "abc123" },
      });

      await waitFor(() => {
        expect(queryByTestId("confirmPassword-message")).toBeNull();
      });
    });
  });

  describe("Form submit", () => {
    test("Submit button is disabled before api responses", async () => {
      (signUp as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 1000))
      );

      fireEvent.change(getByTestId("email-input"), {
        target: { value: "user@example.com" },
      });
      fireEvent.change(getByTestId("nickname-input"), {
        target: { value: "myNickname" },
      });
      fireEvent.change(getByTestId("password-input"), {
        target: { value: "password123" },
      });
      fireEvent.change(getByTestId("confirmPassword-input"), {
        target: { value: "password123" },
      });

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });

      await waitFor(
        () => {
          expect(submitButton).not.toBeDisabled();
        },
        { timeout: 2000 }
      );

      expect(signUp).toHaveBeenCalledWith({
        email: "user@example.com",
        nickname: "myNickname",
        password: "password123",
        confirmPassword: "password123",
      });
    });
  });
});
