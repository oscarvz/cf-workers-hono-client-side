import { useEffect, useState } from "hono/jsx";

import "./index.css";

type Environment = "static" | "dynamic";

export default function Client() {
  const [environment, setEnvironment] = useState<Environment>("static");

  useEffect(() => setEnvironment("dynamic"), []);

  return <h1>This is {environment} awyis</h1>;
}
