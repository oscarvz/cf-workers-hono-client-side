import { Hono } from "hono";

import web from "./web";
import api from "./api";

const app = new Hono();

app.route("/", web);
app.route("/api", api);

export default app;
