import { Fragment } from "hono/jsx";
import { Hono } from "hono";
import { Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";

import { Counter } from "./client/Counter";
import { getAssetImportTagsFromManifest } from "./utils";

const web = new Hono();

web.use(
  "*",
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

          <body>{children}</body>
        </html>
      );
    },
    { docType: true },
  ),
);

// In the SSR example, we provide the root element, which contains the Counter
// component. Counter gets rendered on the server and then hydrated on the
// client.
web.get("/", (c) => {
  return c.render(
    <div id="ssr-root" data-root>
      <Counter />
    </div>,
  );
});

// In the SPA example, we provide the root element, which will be used to render
// the Counter component on the client.
web.get("/spa", (c) => {
  return c.render(<div id="spa-root" data-root />);
});

export default web;
