import { Hono } from "hono";
import type { JSX } from "hono/jsx";
import { jsxRenderer } from "hono/jsx-renderer";
import type { Manifest } from "vite";

import { Counter } from "./client/Counter";
import { Style } from "hono/css";

const app = new Hono();

app.get(
	"/",
	jsxRenderer(
		({ children }) => {
			const assetImportTags = (() => {
				if (!import.meta.env.PROD) {
					return <script type="module" src="/src/client/index.tsx" />;
				}

				const rootManifest = import.meta.glob<{ default: Manifest }>(
					"/public/.vite/manifest.json",
					{ eager: true },
				);

				const manifest = Object.values(rootManifest).at(0)?.default;
				if (!manifest) {
					return null;
				}

				const importTags: Array<
					JSX.IntrinsicElements["link"] | JSX.IntrinsicElements["script"]
				> = [];

				for (const { file, css } of Object.values(manifest)) {
					const scriptTag = <script key={file} type="module" src={file} />;
					importTags.push(scriptTag);

					if (css && css.length > 0) {
						const cssTags = css.map((cssPath) => (
							<link key={cssPath} rel="stylesheet" href={cssPath} />
						));
						importTags.push(cssTags);
					}
				}

				return importTags;
			})();

			return (
				<html lang="en">
					<head>
						<title>Wow bindings</title>
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
	(c) => c.render(<Counter />),
);

export default app;
