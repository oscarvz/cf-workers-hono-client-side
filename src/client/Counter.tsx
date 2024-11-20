import { css } from "hono/css";
import { useState } from "hono/jsx";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section class={sectionClass}>
      <span>Count: {count}</span>

      <button type="button" onClick={() => setCount((c) => c + 1)}>
        Increase count
      </button>
    </section>
  );
}

const sectionClass = css`
  display: grid;
  height: 100%;
  place-content: center;
`;
