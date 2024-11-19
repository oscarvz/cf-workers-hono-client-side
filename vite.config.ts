import devServer from "@hono/vite-dev-server";
import cloudflareAdapter from "@hono/vite-dev-server/cloudflare";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
	return {
		server: { port: 8787 },
		plugins: [
			devServer({
				adapter: cloudflareAdapter,
				entry: "./src/index.tsx",
			}),
		],
	};
});
