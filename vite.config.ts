import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    tsconfigPaths(),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 75,
      },
      webp: {
        quality: 80,
      },
      avif: {
        quality: 70,
      },
      // You can also include images from your 'public' folder:
      includePublic: true,
      // And log the stats to see how much space you're saving:
      logStats: true,
    }),
    visualizer({
      open: true, // This will automatically open the report in your browser
      gzipSize: true, // Show gzip sizes (like your current build output)
      brotliSize: true, // Also show brotli sizes (another way to compress)
      filename: "stats.html", // The name of the report file
    }),
  ],
});
