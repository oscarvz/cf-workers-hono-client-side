import { Hono } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";

const app = new Hono();

app.get(
  "/",
  jsxRenderer(({ children }) => (
    <html lang="en">
      <head>
        <title>Wow bindings</title>
      </head>
      <body>{children}</body>
    </html>
  )),
  (c) => c.render(<h1>Hello Hono!</h1>)
);

interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/assets")) {
      return env.ASSETS.fetch(request);
    }

    return app.fetch(request, env, ctx);
  },
} satisfies ExportedHandler<Env>;
