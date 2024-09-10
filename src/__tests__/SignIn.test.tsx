import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "@/redux/store";
import { SignIn } from "@/pages/Auth/SignIn";
import { signIn } from "@/api/userApi";

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

describe("Sign in form", () => {
  describe("Check form rule", () => {
    it("Wrong email should show an error message", async () => {
      const { getByTestId, queryByTestId } = customRender(<SignIn />);

      const submitButton = getByTestId("submit-button");

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

    it("Wrong password length should show an error message", async () => {
      const { getByTestId, queryByTestId } = customRender(<SignIn />);

      const submitButton = getByTestId("submit-button");

      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("password-message")).toHaveTextContent(
          "密碼至少 6 個字元"
        );
      });

      fireEvent.change(getByTestId("password-input"), {
        target: { value: "short" },
      });
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(getByTestId("password-message")).toHaveTextContent(
          "密碼至少 6 個字元"
        );
      });

      fireEvent.change(getByTestId("password-input"), {
        target: { value: "thisPasswordIsTooLong" },
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
  });

  describe("Form submit", () => {
    test("Submit button is disabled before api responses", async () => {
      (signIn as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 1000))
      );

      const { getByTestId } = customRender(<SignIn />);
      const submitButton = getByTestId("submit-button");

      fireEvent.change(getByTestId("email-input"), {
        target: { value: "user@example.com" },
      });
      fireEvent.change(getByTestId("password-input"), {
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

      expect(signIn).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "password123",
      });
    });
  });
});
