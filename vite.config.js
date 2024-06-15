import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: { "process.env": env },
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
      eslintPlugin({
        cache: false,
        include: ["./src/**/*.js", "./src/**/*.jsx"],
        exclude: [],
      }),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
