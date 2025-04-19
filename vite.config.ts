import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import browserslist from "browserslist";
import { browserslistToTargets } from "lightningcss";
export default defineConfig({
  css: {
    transformer: "lightningcss",
    lightningcss: {
      targets: browserslistToTargets(browserslist(">= 0.25%")),
    },
  },
  build: {
    cssMinify: "lightningcss",
  },
  plugins: [viteSingleFile({ removeViteModuleLoader: true })],
});
