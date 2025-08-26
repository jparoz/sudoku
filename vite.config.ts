import { defineConfig } from "vite";

export default defineConfig({
  base: "/sudoku",
  server: {
    host: true,
    allowedHosts: ["mini.local"],
  },
});
