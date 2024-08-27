import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "../App";

test("測試 App.tsx 頁面是否正常運作", async () => {
  render(<App />);
  expect(true).toBeTruthy();
});

test("測試 App.tsx 的按鈕文字顯示是否正常", async () => {
  render(<App />);

  const button = await screen.findByRole("button");
  expect(button.innerHTML).toBe("count is 0");

  const count = screen.queryByText(/The count is greater then/);
  expect(count).not.toBeInTheDocument();
});

test("測試 App.tsx 的按鈕點擊正常", async () => {
  render(<App />);

  const button = await screen.findByRole("button");

  await user.click(button);
  await user.click(button);

  expect(button.innerHTML).toBe("count is 2");

  const count = screen.queryByText(/The count is greater then/);
  expect(count).toBeInTheDocument();
});
