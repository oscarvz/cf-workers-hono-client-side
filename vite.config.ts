import devServer from "@hono/vite-dev-server";
import cloudflareAdapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";
import build from "@hono/vite-build";

export default defineConfig(({ mode }) => {
	if (mode === "client") {
		return {
			build: {
				rollupOptions: {
					input: "./src/client/index.tsx",
					output: {
						entryFileNames: "assets/[name]-[hash].js",
					},
				},
				outDir: "./public",
				emptyOutDir: false,
				manifest: true,
			},
		};
	}

	const entry = "./src/index.tsx";
	return {
		server: {
			port: 8787,
		},
		plugins: [
			devServer({
				adapter: cloudflareAdapter,
				entry,
			}),
			build({ entry }),
		],
	};
});
