import type { JSX } from "hono/jsx";
import type { Manifest } from "vite";

/**
 * Helper function that reads the Vite manifest and returns the import tags for
 * the JS/CSS assets processed by Vite.
 * Setting `build.manifest` to `true` in the Vite config is required for this.
 */
export function getAssetImportTagsFromManifest() {
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
}
