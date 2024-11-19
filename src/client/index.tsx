import { useEffect, useState } from "hono/jsx";
import "./index.css";

export function Client() {
  const [environment, setEnvironment] = useState<"static" | "dynamic">(
    "static"
  );

  useEffect(() => setEnvironment("dynamic"), []);

  return <h1>This is {environment}</h1>;
}
