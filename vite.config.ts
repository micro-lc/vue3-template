import { fileURLToPath, URL } from "url";
import qiankun from "vite-plugin-qiankun";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [qiankun("vue3-plugin", { useDevMode: true }), vue(), vueJsx()],
  server: {
    port: 8765,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
