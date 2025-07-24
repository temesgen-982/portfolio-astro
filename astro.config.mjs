// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

// import icon from "astro-icon";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte(), icon({})],
});