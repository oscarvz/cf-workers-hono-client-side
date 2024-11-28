import { Hono } from "hono";

const api = new Hono().get("/", (c) => {
  return c.json({
    message:
      "Hello from the APIIIIIIHHHIII, I must've [been?] called a thousand tiiiiiiiiihhiiimes",
  });
});

export type Api = typeof api;

export default api;
