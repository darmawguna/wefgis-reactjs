import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/predict": {
        target: "http://178.16.142.61:8092", // URL server Flask
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/predict/, ""), // Jika perlu menghapus /predict dari path
      },
      "/groundwater": {
        target: "https://rs.wefgis.com",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/groundwater/, "/groundwater"),
      },
      "/histori": {
        target: "http://192.168.100.166:3000/api",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/groundwater/, "/groundwater"),
      },
      "/socket.io": {
        target: "http://localhost:3000/water-levels",
        changeOrigin: true,
        ws: true,
      },
      // "/api/water": {
      //   target: "http://178.16.142.61:8092", // URL server Flask untuk endpoint lainnya
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: (path) => path.replace(/^\/api\/water/, "/water"), // Jika perlu menghapus /api/water dari path
      // },
    },
  },
});
