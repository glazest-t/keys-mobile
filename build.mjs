import { mkdir, readFile, writeFile } from "node:fs/promises";

const fragment = await readFile(new URL("./src/prototype.html", import.meta.url), "utf8");
const document = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#f7f7f5">
  <meta name="description" content="Интерактивный прототип мобильного приложения «Ключи» для путешественников.">
  <title>Ключи — интерактивный прототип</title>
  <script src="https://cdn.jsdelivr.net/npm/lucide@0.468.0/dist/umd/lucide.min.js"></script>
  <style>
    html { min-width: 320px; background: light-dark(#eef0f3, #0b0d10); }
    body { min-height: 100vh; margin: 0; padding: 24px 12px; }
    /* Keep the route timeline continuous in the standalone GitHub Pages build. */
    #keysHomeVariantThree .k3-point { overflow: visible; }
    #keysHomeVariantThree .k3-line {
      align-self: stretch;
      min-height: 64px;
      margin-block: -12px;
      z-index: 0;
    }
    #keysHomeVariantThree .k3-line::before { z-index: 1; }
    @media (max-width: 520px) { body { padding: 8px 0 20px; } }
  </style>
</head>
<body>
${fragment}
</body>
</html>
`;

await mkdir(new URL("./dist/", import.meta.url), { recursive: true });
await writeFile(new URL("./dist/index.html", import.meta.url), document);
await writeFile(new URL("./dist/.nojekyll", import.meta.url), "");

console.log("GitHub Pages build created: dist/index.html");
