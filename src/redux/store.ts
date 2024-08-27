import { createStore } from "redux";
import { reducers } from "./reducer";
import { jsonHandler } from "@/utils/jsonHandler";

// persist state: https://stackoverflow.com/questions/35305661/where-to-write-to-localstorage-in-a-redux-app
const persistState = jsonHandler(localStorage.getItem("userState") || "{}");

const store = createStore(reducers, persistState);

store.subscribe(() => {
  const {
    user: { isLogin, nickname, exp },
  } = store.getState();

  localStorage.setItem(
    "userState",
    JSON.stringify({ user: { isLogin, nickname, exp } })
  );
});

export default store;
