import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./redux/store";
import "@/assets/css/index.css";
import { Toaster } from "@/components/ui/toaster";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename="/online-todo-list">
      <Provider store={store}>
        <App />
        <Toaster />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
