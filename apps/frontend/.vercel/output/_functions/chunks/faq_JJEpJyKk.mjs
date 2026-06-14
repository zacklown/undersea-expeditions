import { c as createComponent } from './astro-component_4tyYTbsQ.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead } from './entrypoint_CPaYjtce.mjs';
import { $ as $$Layout, a as $$Header, b as $$Footer } from './Layout_COaTERnD.mjs';
import { b as getFAQPageContent, e as getFAQs } from './content_Ce3Tp18u.mjs';

const $$Faq = createComponent(async ($$result, $$props, $$slots) => {
  const [pageContent, faqs] = await Promise.all([getFAQPageContent(), getFAQs()]);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "FAQ | Undersea Expeditions" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "active": "faq" })} ${maybeRenderHead()}<main class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24"> <div class="text-center mb-16"> <h1 class="font-display-lg text-display-lg text-primary mb-4">${pageContent.title}</h1> <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto"> ${pageContent.description} </p> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16"> ${pageContent.highlights.map((item) => renderTemplate`<div class="p-8 border border-outline-variant/30 rounded-xl hover:bg-surface-container transition-colors"> <span class="material-symbols-outlined text-on-tertiary-container mb-4">${item.icon}</span> <h2 class="font-headline-md text-primary mb-2">${item.title}</h2> <p class="text-body-md text-on-surface-variant">${item.description}</p> </div>`)} </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8"> ${faqs.map((faq) => renderTemplate`<div class="bg-secondary-container/40 rounded-xl p-8"> <h3 class="font-headline-md text-primary mb-3">${faq.question}</h3> <p class="text-body-md text-on-surface-variant">${faq.answer}</p> </div>`)} </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "active": "faq" })} ` })}`;
}, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/faq.astro", void 0);

const $$file = "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/faq.astro";
const $$url = "/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Faq,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
