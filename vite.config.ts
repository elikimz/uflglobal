// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
//   base: "./",
//   build:{
//     outDir:"dist",
//   },
// });



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "/", // Important! Not "./"
  build: {
    outDir: "dist",
    assetsDir: "assets", // Ensure assets go to /assets
  },
});
