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
    #keysFourSections .kf-breakfast-offer { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: start; gap: 12px; padding: 14px; }
    #keysFourSections .kf-breakfast-main { min-width: 0; }
    #keysFourSections .kf-breakfast-main > strong { margin: 0; }
    #keysFourSections .kf-breakfast-side { text-align: right; white-space: nowrap; }
    #keysFourSections .kf-breakfast-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
    #keysFourSections .kf-breakfast-tags span { display: inline-flex; align-items: center; min-height: 25px; padding: 4px 8px; border-radius: 9px; background: #f0f2f5; color: #626873; font-size: 11px; line-height: 15px; font-weight: 400; }
    #keysFourSections .kf-breakfast-old { display: block; font-size: 11px; line-height: 15px; font-weight: 400; color: #8a9099; text-decoration: line-through; }
    #keysFourSections .kf-breakfast-new { display: block; margin-top: 2px; font-size: 13px; line-height: 17px; font-weight: 600; color: #2857d8; }
    #keysFourSections .kf-breakfast-saving { display: block; margin-top: 3px; font-size: 11px; line-height: 15px; font-weight: 600; color: #23714e; }
    #keysFourSections .kf-benefit-hero + .kf-section { margin-bottom: 0; }
    @media (max-width: 520px) { body { padding: 8px 0 20px; } }
  </style>
</head>
<body>
${fragment}
<script>
  (() => {
    const breakfast = document.querySelector('#keysFourSections [data-open="breakfast"]');
    const fitness = document.querySelector('#keysFourSections [data-open="fitness"]');
    if (breakfast) {
      breakfast.className = 'kf-offer kf-breakfast-offer';
      breakfast.innerHTML = '<span class="kf-breakfast-main"><strong>Завтрак «Шведский стол»</strong><span class="kf-breakfast-tags"><span>Ресторан LEA</span><span>07:00–12:00</span></span></span><span class="kf-breakfast-side"><span class="kf-breakfast-old">800 ₽/сутки</span><span class="kf-breakfast-new">680 ₽/сутки</span><span class="kf-breakfast-saving">Выгода 120 ₽</span></span>';
    }
    if (fitness) {
      fitness.innerHTML = '<span><strong>Фитнес-студия</strong><span class="kf-breakfast-tags"><span>Ежедневно</span><span>07:00–23:00</span></span></span><span class="kf-price">Включено</span>';
    }
    const profileIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>';
    document.querySelectorAll('.k3-tab,.kp-tab,.kf-tab,.ktd-tab,.ksd-tab').forEach((button) => {
      if (button.querySelector(':scope > span:last-child')?.textContent.trim() !== 'Профиль') return;
      button.querySelector(':scope > svg,:scope > i')?.remove();
      button.insertAdjacentHTML('afterbegin', profileIcon);
    });
  })();
</script>
</body>
</html>
`;

await mkdir(new URL("./dist/", import.meta.url), { recursive: true });
await writeFile(new URL("./dist/index.html", import.meta.url), document);
await writeFile(new URL("./dist/.nojekyll", import.meta.url), "");

console.log("GitHub Pages build created: dist/index.html");
