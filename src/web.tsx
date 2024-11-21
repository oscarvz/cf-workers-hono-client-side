import { Hono } from "hono";
import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";

import { Counter } from "./client/Counter";
import { getAssetImportTagsFromManifest } from "./utils";

const app = new Hono();

app.use(
	"/",
	jsxRenderer(
		({ children }) => {
			const assetImportTags = getAssetImportTagsFromManifest();

			return (
				<html lang="en">
					<head>
						<title>Wow cf-workers-hono-client-side</title>
						<link rel="icon" href="/favicon.svg" />
						<Style />
						{assetImportTags}
					</head>

					<body>
						<div id="root">{children}</div>
					</body>
				</html>
			);
		},
		{ docType: true },
	),
);

app.get("/", (c) => c.render(<Counter />));

export default app;
