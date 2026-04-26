import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      tsconfigPath: "tsconfig.json",
      logLevel: "error",
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Flowgrid",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "flowgrid.js" : "flowgrid.cjs"),
      cssFileName: "flowgrid",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@tanstack/react-virtual",
      ],
    },
  },
});
