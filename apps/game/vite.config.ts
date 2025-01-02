import path from "path";
import checker from "vite-plugin-checker";

// vite.config.js
export default {
  // config options
  build: {
    target: "modules",
    outDir: "dist",
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
