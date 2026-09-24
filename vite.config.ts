import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// BASE_PATH lets the same build run from a sub-path, e.g. GitHub Pages serves this repo
// at /DH-Property-Management/. Defaults to the domain root.
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react()],
});
