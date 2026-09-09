import { mkdir, readFile, writeFile } from "node:fs/promises";

const fragment = await readFile(new URL("./src/prototype.html", import.meta.url), "utf8");
const document = `<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#f7f7f5">
  <meta name="description" content="Интерактивный прототип мобильного приложения «Ключи» для путешественников.">
  <title>Ключи — интерактивный прототип</title>
  <script src="https://cdn.jsdelivr.net/npm/lucide@0.468.0/dist/umd/lucide.min.js"></script>
  <style>
    :root { color-scheme: light only; }
    html { min-width: 320px; background: #eef0f3; }
    body { min-height: 100vh; margin: 0; padding: 24px 12px; }
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
