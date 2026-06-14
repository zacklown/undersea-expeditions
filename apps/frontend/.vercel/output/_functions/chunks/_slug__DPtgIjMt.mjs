import { c as createComponent } from './astro-component_4tyYTbsQ.mjs';
import 'piccolore';
import { h as addAttribute, r as renderTemplate, p as renderHead } from './entrypoint_CPaYjtce.mjs';
import 'clsx';
import { h as getTripBySlug } from './content_Ce3Tp18u.mjs';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const trip = slug ? await getTripBySlug(slug) : null;
  const redirectPath = trip?.path;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><title>Redirecting...</title>${redirectPath && renderTemplate`<meta http-equiv="refresh"${addAttribute(`0;url=${redirectPath}`, "content")}>`}${redirectPath && renderTemplate`<link rel="canonical"${addAttribute(redirectPath, "href")}>`}${renderHead()}</head> <body> ${redirectPath ? renderTemplate`<p>
Redirecting to <a${addAttribute(redirectPath, "href")}>${redirectPath}</a>.
</p>` : renderTemplate`<p>Trip not found.</p>`} </body></html>`;
}, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/trips/[slug].astro", void 0);

const $$file = "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/trips/[slug].astro";
const $$url = "/trips/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
