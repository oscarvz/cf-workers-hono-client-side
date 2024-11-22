import { Hono } from "hono";
import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";

import { Counter } from "./client/Counter";
import { getAssetImportTagsFromManifest } from "./utils";

const web = new Hono();

web.use(
	"/",
	jsxRenderer(
		({ children }) => {
			const assetImportTags = getAssetImportTagsFromManifest();

			return (
				<html lang="en">
					<head>
						<meta charSet="utf-8" />
						<meta
							content="width=device-width, initial-scale=1"
							name="viewport"
						/>
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

web.get("/", (c) => c.render(<Counter />));

export default web;
