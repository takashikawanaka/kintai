import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      "/data-api/graphql": "http://localhost:4280/",
      "/login": {
        target: "http://localhost:4280/.auth/login/aad",
        rewrite: (path) => path.replace(/^\/login /, ""),
      },
      "/logout": {
        target: "http://localhost:4280/.auth/logout/",
        rewrite: (path) => path.replace(/^\/logout/, ""),
      },
      "/me": {
        target: "http://localhost:4280/.auth/me/",
        rewrite: (path) => path.replace(/^\/me/, ""),
      },
    },
  },
});
