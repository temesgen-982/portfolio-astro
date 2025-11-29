// @ts-check
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

import icon from "astro-icon";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

import sitemap from '@astrojs/sitemap';

import robotsTxt from 'astro-robots-txt';

// import icon from "astro-icon";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://temesgen.vercel.app',
  integrations: [svelte(), icon({}), sitemap(), robotsTxt()],
  adapter: vercel(),
});
