import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        // browser router with github pages: https://stackoverflow.com/questions/76115927/page-not-found-react-vite-app-not-routing-correctly-on-github-pages
        404: path.resolve(__dirname, "public/404.html"),
      },
    },
  },
  base: "/online-todo-list",
});
