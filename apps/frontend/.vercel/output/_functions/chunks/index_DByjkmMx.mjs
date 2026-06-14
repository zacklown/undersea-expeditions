import { c as createComponent } from './astro-component_4tyYTbsQ.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, r as renderTemplate, n as renderComponent } from './entrypoint_CPaYjtce.mjs';
import 'clsx';
import { r as renderScript } from './script_DWPeTHg-.mjs';
import { $ as $$Layout, a as $$Header, b as $$Footer } from './Layout_COaTERnD.mjs';
import { k as getHomePageContent, c as getSiteSettings, d as getTrips } from './content_Ce3Tp18u.mjs';

const $$FeaturedTripsCarousel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$FeaturedTripsCarousel;
  const { description, title, trips } = Astro2.props;
  const loopedTrips = [...trips, ...trips, ...trips];
  return renderTemplate`${trips.length > 0 && renderTemplate`${maybeRenderHead()}<section class="bg-surface-container-low py-16 md:py-20"><div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop" data-featured-carousel${addAttribute(trips.length, "data-trip-count")} style="--featured-gap:1.5rem;--featured-per-page:1;"><div class="mb-7 flex items-end justify-between gap-6 md:mb-8"><div class="max-w-2xl"><h2 class="font-headline-lg text-headline-lg text-primary">${title}</h2>${description && renderTemplate`<p class="mt-3 text-body-lg text-secondary">${description}</p>`}</div>${trips.length > 1 && renderTemplate`<div class="hidden items-center gap-3 md:flex"><button aria-label="Previous featured trips" class="flex h-12 w-12 items-center justify-center rounded-full border border-secondary-fixed bg-white text-primary transition-colors hover:bg-primary hover:text-white" data-featured-prev type="button"><span class="material-symbols-outlined">arrow_back</span></button><button aria-label="Next featured trips" class="flex h-12 w-12 items-center justify-center rounded-full border border-secondary-fixed bg-white text-primary transition-colors hover:bg-primary hover:text-white" data-featured-next type="button"><span class="material-symbols-outlined">arrow_forward</span></button></div>`}</div><div class="overflow-hidden" data-featured-viewport><div class="flex transition-transform duration-500 ease-out" data-featured-track style="gap:var(--featured-gap);">${loopedTrips.map((trip, index) => renderTemplate`<article class="group relative shrink-0 overflow-hidden rounded-2xl border border-secondary-fixed bg-white shadow-sm transition-shadow hover:shadow-xl" data-featured-card${addAttribute(index % trips.length, "data-source-index")} style="flex-basis:calc((100% - (var(--featured-gap) * (var(--featured-per-page) - 1))) / var(--featured-per-page));"><div class="flex h-[35rem] flex-col"><div class="h-56 overflow-hidden md:h-60"><img${addAttribute(trip.coverImage.alt || trip.title, "alt")} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"${addAttribute(trip.coverImage.url, "src")}></div><div class="flex flex-1 flex-col p-5 md:p-6"><div class="mb-3 flex flex-wrap items-center gap-2.5"><span class="rounded-full bg-secondary-container px-3 py-1 text-label-sm font-label-sm text-primary">${trip.regionLabel}</span>${trip.isNew && renderTemplate`<span class="rounded-full bg-[#C5A059] px-3 py-1 text-label-sm font-label-sm text-white">
New
</span>`}</div><h3 class="font-headline-md text-headline-md text-primary">${trip.title}</h3><p class="mt-2 font-bold text-on-tertiary-container">${trip.dateLabel}</p><p class="mt-3 text-body-md text-secondary">${trip.summary}</p><a class="mt-auto inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 font-bold text-primary transition-all hover:bg-primary hover:text-white"${addAttribute(trip.path, "href")}>${trip.bookingLabel}</a></div></div></article>`)}</div></div>${trips.length > 1 && renderTemplate`<div class="mt-5 flex items-center justify-center gap-3 md:hidden"><button aria-label="Previous featured trips" class="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-fixed bg-white text-primary transition-colors hover:bg-primary hover:text-white" data-featured-prev type="button"><span class="material-symbols-outlined">arrow_back</span></button><button aria-label="Next featured trips" class="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-fixed bg-white text-primary transition-colors hover:bg-primary hover:text-white" data-featured-next type="button"><span class="material-symbols-outlined">arrow_forward</span></button></div>`}</div></section>`}${renderScript($$result, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/components/FeaturedTripsCarousel.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/components/FeaturedTripsCarousel.astro", void 0);

const mapImage = new Proxy({"src":"/_astro/MapChart_Map.DKocvuvG.png","width":7000,"height":3744,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/assets/MapChart_Map.png";
							}
							
							return target[name];
						}
					});

const $$HomeTripMap = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$HomeTripMap;
  const { buttonHref, buttonLabel, description, title, trips } = Astro2.props;
  const colorMap = {
    amber: "#D88906",
    apricot: "#F4A261",
    aqua: "#56CFE1",
    berry: "#A23E8A",
    blush: "#F2B5D4",
    brick: "#B85C38",
    bronze: "#B7791F",
    coral: "#E76F51",
    crimson: "#B22222",
    "deep-blue": "#1D4E89",
    emerald: "#2D8F5A",
    forest: "#2F5D50",
    gold: "#C5A059",
    "hot-pink": "#FF4F8B",
    indigo: "#4B3F93",
    lavender: "#A78BFA",
    lemon: "#FFD166",
    mint: "#8BD3C7",
    ocean: "#0077B6",
    orchid: "#C77DFF",
    peacock: "#006D77",
    plum: "#6E3B6E",
    seafoam: "#2A9D8F",
    terracotta: "#C96F4A"
  };
  const pinnedTrips = trips.filter(
    (trip) => trip.mapPin && Number.isFinite(trip.mapPin.xPercent) && Number.isFinite(trip.mapPin.yPercent)
  );
  return renderTemplate`${pinnedTrips.length > 0 && renderTemplate`${maybeRenderHead()}<section class="bg-[#F5FBFD] py-16 md:py-20"><div class="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop"><div class="mb-7 max-w-3xl md:mb-8"><h2 class="font-headline-lg text-headline-lg text-primary">${title}</h2>${description && renderTemplate`<p class="mt-3 text-body-lg text-secondary">${description}</p>`}</div><div class="overflow-hidden rounded-[32px] border border-secondary-fixed/60 bg-white shadow-[0_30px_80px_rgba(4,44,72,0.10)]"><div class="relative w-full bg-[#EAF4F8]"${addAttribute(`aspect-ratio:${mapImage.width}/${mapImage.height};`, "style")}><img alt="Undersea Expeditions destination map" class="block h-full w-full object-contain"${addAttribute(mapImage.src, "src")}>${pinnedTrips.map((trip) => renderTemplate`<a${addAttribute(`View trip: ${trip.title}`, "aria-label")} class="group absolute"${addAttribute(trip.path, "href")}${addAttribute(`left:${trip.mapPin.xPercent}%;top:${trip.mapPin.yPercent}%;transform:translate(-50%,-100%);`, "style")}${addAttribute(trip.title, "title")}><span class="relative flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-[0_12px_24px_rgba(4,44,72,0.20)] transition-transform duration-200 group-hover:scale-110 md:h-8 md:w-8"${addAttribute(`background:${colorMap[trip.mapPin.color] || colorMap.gold};`, "style")}><span class="h-2 w-2 rounded-full bg-white md:h-2.5 md:w-2.5"></span><span class="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-[55%] rotate-45 border-r-2 border-b-2 border-white md:h-3.5 md:w-3.5"${addAttribute(`background:${colorMap[trip.mapPin.color] || colorMap.gold};`, "style")}></span></span><span class="pointer-events-none absolute left-1/2 top-[-0.75rem] hidden -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-lg group-hover:block">${trip.title}</span></a>`)}</div></div><div class="mt-6 flex justify-center md:mt-7"><a class="inline-flex items-center justify-center rounded-lg bg-[#C5A059] px-8 py-4 font-bold text-white shadow-lg transition-colors hover:bg-on-tertiary-container"${addAttribute(buttonHref, "href")}>${buttonLabel}</a></div></div></section>`}`;
}, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/components/HomeTripMap.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const [homePage, siteSettings, trips] = await Promise.all([
    getHomePageContent(),
    getSiteSettings(),
    getTrips()
  ]);
  const featuredTrips = trips.filter((trip) => trip.featuredOnHomepage);
  const homepageFeaturedTrips = (featuredTrips.length > 0 ? featuredTrips : trips).slice(0, Math.max(featuredTrips.length, 3));
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Undersea Expeditions | LGBTQ+ Scuba Dive Travel Experts" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "active": "home" })} ${maybeRenderHead()}<main> <section class="relative flex min-h-[720px] items-center overflow-hidden py-24 md:min-h-[780px] md:py-28"> <img${addAttribute(homePage.hero.image.alt || homePage.hero.title, "alt")} class="absolute inset-0 w-full h-full object-cover"${addAttribute(homePage.hero.image.url, "src")}> <div class="absolute inset-0 bg-gradient-to-r from-primary/60 to-transparent"></div> <div class="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full"> <div class="max-w-[52rem]"> ${homePage.hero.logo ? renderTemplate`<img${addAttribute(homePage.hero.logo.alt || homePage.hero.title || "Undersea Expeditions", "alt")} class="mb-5 max-h-56 w-auto max-w-full object-contain md:mb-6 md:max-h-72 lg:max-h-80"${addAttribute(homePage.hero.logo.url, "src")}>` : renderTemplate`<h1 class="mb-5 font-display-lg text-display-lg text-white md:mb-6">${homePage.hero.title}</h1>`} ${homePage.hero.description && renderTemplate`<p class="mb-7 max-w-2xl font-body-lg text-body-lg text-white/90 md:mb-8">${homePage.hero.description}</p>`} <div class="flex flex-col sm:flex-row gap-4"> ${homePage.hero.secondaryCtaLabel && homePage.hero.secondaryCtaHref && renderTemplate`<a class="bg-white/10 backdrop-blur-md border border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition-colors text-center"${addAttribute(homePage.hero.secondaryCtaHref, "href")}>${homePage.hero.secondaryCtaLabel}</a>`} <a class="bg-[#C5A059] text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:bg-on-tertiary-container transition-colors text-center"${addAttribute(homePage.hero.primaryCtaHref, "href")}>${homePage.hero.primaryCtaLabel}</a> </div> </div> </div> </section> ${renderComponent($$result2, "FeaturedTripsCarousel", $$FeaturedTripsCarousel, { "description": homePage.featuredTrips.description, "title": homePage.featuredTrips.title, "trips": homepageFeaturedTrips })} ${renderComponent($$result2, "HomeTripMap", $$HomeTripMap, { "buttonHref": homePage.mapSection.buttonHref, "buttonLabel": "See More Trips", "description": homePage.mapSection.description, "title": homePage.mapSection.title, "trips": trips })} <section class="mx-auto max-w-container-max overflow-hidden px-margin-mobile py-16 md:px-margin-desktop md:py-20"> <div class="flex flex-col items-center gap-10 md:flex-row md:gap-12"> <div class="w-full md:w-1/2 relative"> <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl"> <img${addAttribute(homePage.story.image.alt || homePage.story.title, "alt")} class="w-full aspect-square object-cover"${addAttribute(homePage.story.image.url, "src")}> </div> <div class="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary-container rounded-full -z-10"></div> <div class="absolute -top-8 -left-8 w-32 h-32 border-4 border-on-tertiary-container rounded-lg -z-10"></div> </div> <div class="w-full md:w-1/2"> <h2 class="mb-5 font-headline-lg text-headline-lg text-primary md:mb-6">${homePage.story.title}</h2> ${homePage.story.body.map((paragraph, index) => renderTemplate`<p${addAttribute(["font-body-lg text-body-lg text-secondary leading-relaxed", index === 0 ? "mb-5" : "mb-6"], "class:list")}>${paragraph}</p>`)} ${homePage.story.buttonLabel && homePage.story.buttonHref && renderTemplate`<a class="inline-flex items-center justify-center rounded-lg border border-primary px-6 py-3 font-bold text-primary transition-all hover:bg-primary hover:text-white"${addAttribute(homePage.story.buttonHref, "href")}> ${homePage.story.buttonLabel} </a>`} </div> </div> </section> <section class="bg-primary py-16 text-center text-white md:py-20"> <div class="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"> <h2 class="mb-6 font-headline-lg text-headline-lg text-white md:mb-7">${homePage.cta.title}</h2> <p class="mx-auto mb-10 max-w-2xl font-body-lg text-body-lg opacity-90 md:mb-12">${homePage.cta.description}</p> <div class="mb-4 flex flex-col items-center justify-center gap-10 md:mb-0 md:flex-row md:gap-12"> <div class="flex flex-col items-center"> <span class="material-symbols-outlined text-4xl mb-4 text-[#C5A059]">call</span> <p class="text-label-sm font-label-sm opacity-70 mb-1">${homePage.cta.phoneLabel}</p> <a class="font-headline-md text-headline-md hover:text-[#C5A059] transition-colors"${addAttribute(`tel:${siteSettings.contact.tollFreePhone}`, "href")}>${siteSettings.contact.tollFreePhone}</a> </div> <div class="w-px h-24 bg-white/20 hidden md:block"></div> <div class="flex flex-col items-center"> <span class="material-symbols-outlined text-4xl mb-4 text-[#C5A059]">mail</span> <p class="text-label-sm font-label-sm opacity-70 mb-1">${homePage.cta.emailLabel}</p> <a class="font-headline-md text-headline-md hover:text-[#C5A059] transition-colors"${addAttribute(`mailto:${siteSettings.contact.email}`, "href")}>${siteSettings.contact.email}</a> </div> </div> </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "active": "home" })} ` })}`;
}, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/index.astro", void 0);

const $$file = "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
