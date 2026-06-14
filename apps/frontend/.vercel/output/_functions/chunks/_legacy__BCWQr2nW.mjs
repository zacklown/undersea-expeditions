import { c as createComponent } from './astro-component_DQDEigrw.mjs';
import 'piccolore';
import { h as addAttribute, r as renderTemplate, p as renderHead } from './entrypoint_B01AMM-M.mjs';
import 'clsx';
import { d as getTrips } from './content_C5Rdr6fg.mjs';

const $$legacy = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$legacy;
  const { legacy } = Astro2.params;
  const trips = await getTrips();
  const path = trips.find((trip) => {
    const legacyUrl = trip.legacyUrl || "";
    if (!legacyUrl.startsWith("/gay-scuba-trips/")) {
      return false;
    }
    const legacySlug = legacyUrl.replace(/^\/gay-scuba-trips\//, "");
    return Boolean(legacy) && legacySlug === legacy;
  })?.path;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><title>Redirecting…</title>${path && renderTemplate`<meta http-equiv="refresh"${addAttribute(`0;url=${path}`, "content")}>`}${path && renderTemplate`<link rel="canonical"${addAttribute(path, "href")}>`}${renderHead()}</head> <body> ${path ? renderTemplate`<p>
Redirecting to <a${addAttribute(path, "href")}>${path}</a>.
</p>` : renderTemplate`<p>Trip not found.</p>`} </body></html>`;
}, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/gay-scuba-trips/[legacy].astro", void 0);

const $$file = "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/gay-scuba-trips/[legacy].astro";
const $$url = "/gay-scuba-trips/[legacy]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$legacy,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
