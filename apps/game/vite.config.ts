import path from "path";
import checker from "vite-plugin-checker";

// vite.config.js
export default {
  // config options
  build: {
    target: "modules",
    outDir: "dist",
    chunkSizeWarningLimit: "1000kB",
    rollupOptions: {
      output: {
        preserveModules: true
      },
      preserveEntrySignatures: "exports-only"
    }
  },
  resolve: {
    alias: {
      src: path.resolve("src/")
    }
  },
  plugins: [
    checker({
      typescript: true
    })
  ]
};
