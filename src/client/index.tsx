import { StrictMode } from "hono/jsx";
import { hydrateRoot } from "hono/jsx/dom/client";

import { Counter } from "./Counter";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
	throw new Error("Root element not found", {
		cause: "The root element with the id 'root' is missing in the document.",
	});
}

hydrateRoot(
	root,
	<StrictMode>
		<Counter />
	</StrictMode>,
);
