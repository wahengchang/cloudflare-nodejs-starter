import Mustache from "mustache";
import { translations } from "../templates/translations.js";
import mainTemplate from "../templates/views/main.js";
import partials from "../templates/partials/partials.js";

function getLangFromPath(pathname) {
  if (pathname === "/" || pathname === "/en") return "en";
  if (pathname === "/zh-cn") return "zh-cn";
  return "en"; // fallback to English
}

export async function handlePages(request) {
  const url = new URL(request.url);
  const lang = getLangFromPath(url.pathname);
  const data = translations[lang] || translations.default;
  const html = Mustache.render(mainTemplate, data, partials);
  return new Response(html, {
    headers: { "content-type": "text/html; charset=UTF-8" },
  });
}
