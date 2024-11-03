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
  }
};
