import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/lib/paraglide",
			cookieName: "language",
			cookieDomain: process.env.PUBLIC_COOKIE_DOMAIN || undefined
		})
	],
	server: { allowedHosts: ["localhost", ".szeroki.fr"] }
});
