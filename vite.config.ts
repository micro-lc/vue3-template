import { fileURLToPath, URL } from "url";
import qiankun from "vite-plugin-qiankun";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";

const port = 8765;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    qiankun("vue3-plugin", { useDevMode: true }),
    vue(),
    vueJsx(),
    svgLoader({
      defaultImport: "component",
    }),
  ],
  base: mode === "development" ? `http://localhost:${port}/` : "/vue-app/",
  server: { port },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
