import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, ".."), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    define: {
      "import.meta.env": env,
    },
    root: ".",
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
  };
});
