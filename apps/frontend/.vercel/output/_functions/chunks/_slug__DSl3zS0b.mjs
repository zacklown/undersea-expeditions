import { c as createComponent } from './astro-component_4tyYTbsQ.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead, o as Fragment, h as addAttribute, u as unescapeHTML } from './entrypoint_CPaYjtce.mjs';
import { $ as $$Layout, a as $$Header, b as $$Footer } from './Layout_COaTERnD.mjs';
import { d as getTrips, j as getTripByYearAndSlug, c as getSiteSettings } from './content_Ce3Tp18u.mjs';

const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug, year } = Astro2.params;
  const trips = await getTrips();
  const trip = slug && year ? await getTripByYearAndSlug(year, slug) : null;
  const siteSettings = await getSiteSettings();
  const otherTrips = trips.filter((item) => item.path !== trip?.path);
  const featuredTrips = otherTrips.filter((item) => item.featuredOnHomepage).slice(0, 4);
  const upcomingTrips = otherTrips.filter((item) => !item.featuredOnHomepage).slice(0, 6);
  const stayIcon = trip?.tripStyle === "liveaboard" ? "directions_boat" : "hotel";
  const stayLabel = trip?.stays?.join(", ") || "";
  const insuranceImage = trip?.insuranceImage || siteSettings.insurance.defaultImage || trip?.coverImage;
  const socialEmbeds = trip?.socialEmbeds?.map((embed) => {
    if (!embed?.postUrl) return null;
    try {
      const url = new URL(embed.postUrl);
      const pathname = url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`;
      if (embed.platform === "instagram") {
        return {
          ...embed,
          embedUrl: `https://www.instagram.com${pathname}embed/captioned/`
        };
      }
      if (embed.platform === "facebook") {
        return {
          ...embed,
          embedUrl: `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(embed.postUrl)}&show_text=true&width=500`
        };
      }
    } catch {
      return null;
    }
    return null;
  }).filter(Boolean) || [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${trip?.title || "Trip"} | Undersea Expeditions` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "active": "trips" })} ${maybeRenderHead()}<main> ${trip ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <section class="relative flex min-h-[520px] items-end overflow-hidden"> <img${addAttribute(trip.bannerImage.alt || trip.title, "alt")} class="absolute inset-0 h-full w-full object-cover"${addAttribute(trip.bannerImage.url, "src")}> <div class="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div> <div class="relative z-10 mx-auto w-full max-w-container-max px-margin-mobile py-20 text-white md:px-margin-desktop"> <div class="max-w-3xl"> <span class="inline-flex rounded-full bg-white/15 px-4 py-1 text-label-sm font-label-sm backdrop-blur-md"> ${trip.regionLabel} </span> ${trip.isNew && renderTemplate`<span class="ml-3 inline-flex rounded-full bg-[#C5A059] px-4 py-1 text-label-sm font-label-sm text-white">
New
</span>`} <h1 class="mt-6 mb-4 font-display-lg text-display-lg">${trip.title}</h1> <p class="mb-4 font-headline-md text-headline-md text-white/90"> ${trip.countries.join(", ")} </p> ${trip.groupTypeLabel && renderTemplate`<p class="mb-4 font-label-sm text-label-sm uppercase tracking-[0.16em] text-white/80"> ${trip.groupTypeLabel} </p>`} <div class="max-w-2xl text-white/85 [&>p]:mb-4 [&>p]:font-body-lg [&>p]:text-body-lg">${unescapeHTML(trip.summaryHtml || trip.summary)}</div> </div> </div> </section> ${socialEmbeds.length > 0 && renderTemplate`<section class="relative z-20 mx-auto -mt-10 mb-12 max-w-container-max px-margin-mobile md:px-margin-desktop"> <div class="rounded-3xl border border-primary/15 bg-white/95 p-8 shadow-xl backdrop-blur-md"> <div class="mb-6 max-w-2xl"> <p class="mb-2 font-label-sm text-label-sm uppercase tracking-[0.16em] text-on-tertiary-container">
Trip Social Posts
</p> <h2 class="font-headline-md text-headline-md text-primary">See this trip on social</h2> </div> <div class="grid grid-cols-1 gap-6 xl:grid-cols-2"> ${socialEmbeds.map((embed) => renderTemplate`<article class="overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-low p-4"> <div class="mb-4 flex items-center justify-between gap-4 px-2 pt-2"> <div> <p class="font-label-sm text-label-sm uppercase tracking-[0.16em] text-on-tertiary-container"> ${embed.platform} </p> ${embed.title && renderTemplate`<h3 class="mt-1 font-bold text-primary">${embed.title}</h3>`} </div> <a class="text-sm font-bold text-on-tertiary-container hover:underline"${addAttribute(embed.postUrl, "href")} rel="noreferrer" target="_blank">
Open Post
</a> </div> <div class="overflow-hidden rounded-[24px] bg-white"> <iframe${addAttribute(embed.title || `${embed.platform} post`, "title")}${addAttribute(embed.embedUrl, "src")} class="w-full"${addAttribute(embed.platform === "facebook" ? "640" : "720", "height")} style="border:none;overflow:hidden;" scrolling="no" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe> </div> </article>`)} </div> </div> </section>`}<section class="mx-auto max-w-[1520px] px-margin-mobile py-section-padding md:px-margin-desktop"> <div class="grid grid-cols-1 gap-8 xl:grid-cols-[18rem_minmax(0,1fr)_18rem]"> <aside class="order-2 xl:order-none xl:sticky xl:top-28 xl:self-start"> <div class="space-y-6"> ${featuredTrips.length > 0 && renderTemplate`<div class="rounded-3xl border border-outline-variant/20 bg-surface-container-low p-7"> <h2 class="mb-5 font-headline-md text-headline-md text-primary">Featured Trips</h2> <div class="space-y-4"> ${featuredTrips.map((item) => renderTemplate`<a class="block transition-opacity hover:opacity-80"${addAttribute(item.path, "href")}> <p class="font-bold text-primary">${item.title}</p> <p class="mt-1 text-sm text-on-surface-variant">${item.dateLabel}</p> </a>`)} </div> </div>`} ${upcomingTrips.length > 0 && renderTemplate`<div class="rounded-3xl border border-outline-variant/20 bg-surface-container-low p-7"> <h2 class="mb-5 font-headline-md text-headline-md text-primary">Upcoming Trips</h2> <div class="space-y-4"> ${upcomingTrips.map((item) => renderTemplate`<a class="block transition-opacity hover:opacity-80"${addAttribute(item.path, "href")}> <p class="font-bold text-primary">${item.title}</p> <p class="mt-1 text-sm text-on-surface-variant">${item.dateLabel}</p> </a>`)} </div> </div>`} </div> </aside> <article class="order-1 min-w-0 rounded-3xl border border-secondary-fixed bg-white p-8 shadow-sm md:p-10 xl:order-none xl:p-12"> <section class="mb-10 rounded-3xl bg-surface-container-low p-6 md:p-8"> <div class="mb-6 flex flex-col gap-4 border-b border-outline-variant/20 pb-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between"> <div class="flex items-center gap-3 text-primary"> <span class="material-symbols-outlined">calendar_today</span> <span class="font-bold">${trip.dateLabel}</span> </div> ${stayLabel && renderTemplate`<div class="flex items-center gap-3 text-on-surface-variant"> <span class="material-symbols-outlined text-primary">${stayIcon}</span> <span class="font-medium">${stayLabel}</span> </div>`} ${(trip.days || trip.nights) && renderTemplate`<div class="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary"> ${trip.days || 0} Days / ${trip.nights || 0} Nights
</div>`} </div> <div class="text-on-surface-variant"> <img${addAttribute(trip.coverImage.alt || trip.title, "alt")} class="mb-6 h-72 w-full rounded-2xl object-cover shadow-sm lg:float-right lg:mb-4 lg:ml-8 lg:h-[26rem] lg:w-[22rem] xl:w-[24rem]"${addAttribute(trip.coverImage.url, "src")}> ${(trip.summaryHtml || trip.summary) && renderTemplate`<div class="mb-6 text-primary [&>p]:mb-4 [&>p]:font-body-lg [&>p]:text-body-lg">${unescapeHTML(trip.summaryHtml || trip.summary)}</div>`} ${trip.overview && renderTemplate`<div class="[&>p]:mb-4 [&>p]:font-body-md [&>p]:text-body-md [&_a]:text-on-tertiary-container [&_a]:underline [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">${unescapeHTML(trip.overview)}</div>`} <div class="clear-both"></div> </div> </section> <div class="space-y-6 leading-relaxed text-on-surface-variant"> ${trip.packageIncludes && renderTemplate`<section> <h2 class="mb-4 font-headline-md text-headline-md text-primary">
Our Package Includes
</h2> <div class="[&>p]:mb-4 [&>p]:font-body-md [&>p]:text-body-md [&_a]:text-on-tertiary-container [&_a]:underline [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">${unescapeHTML(trip.packageIncludes)}</div> </section>`} ${trip.notIncluded && renderTemplate`<section> <h2 class="mb-4 font-headline-md text-headline-md text-primary">Not Included</h2> <div class="[&>p]:mb-4 [&>p]:font-body-md [&>p]:text-body-md [&_a]:text-on-tertiary-container [&_a]:underline [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">${unescapeHTML(trip.notIncluded)}</div> </section>`} ${trip.flights && renderTemplate`<section> <h2 class="mb-4 font-headline-md text-headline-md text-primary">Flights</h2> <div class="[&>p]:mb-4 [&>p]:font-body-md [&>p]:text-body-md [&_a]:text-on-tertiary-container [&_a]:underline [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">${unescapeHTML(trip.flights)}</div> </section>`} ${trip.deposit && renderTemplate`<section> <h2 class="mb-4 font-headline-md text-headline-md text-primary">Deposit</h2> <div class="[&>p]:mb-4 [&>p]:font-body-md [&>p]:text-body-md [&_a]:text-on-tertiary-container [&_a]:underline [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">${unescapeHTML(trip.deposit)}</div> </section>`} </div> </article> <aside class="order-3 xl:order-none xl:sticky xl:top-28 xl:self-start"> <div class="space-y-6"> <div class="rounded-3xl bg-secondary-container p-7 xl:p-8"> <h2 class="mb-4 font-headline-md text-headline-md text-primary">Contact Us</h2> <p class="mb-8 text-body-md text-on-surface-variant">
Reach out for cabins, experience requirements, pricing, and itinerary fit.
</p> ${trip.pricingOptions && trip.pricingOptions.length > 0 && renderTemplate`<div class="mb-8 space-y-4"> ${trip.pricingOptions.map((price) => renderTemplate`<div class="rounded-2xl bg-white/70 p-4"> <p class="font-bold text-primary">${price.label}</p> <p class="text-on-tertiary-container">$${price.amount}</p> ${price.note && renderTemplate`<div class="mt-1 text-sm text-on-surface-variant [&_a]:text-on-tertiary-container [&_a]:underline">${unescapeHTML(price.note)}</div>`} </div>`)} </div>`} <a class="block w-full rounded-full bg-on-tertiary-container px-6 py-4 text-center font-bold text-white transition-opacity hover:opacity-90"${addAttribute(trip.bookingHref, "href")}> ${trip.bookingLabel || "Contact Us"} </a> </div> <div class="rounded-3xl border border-outline-variant/20 bg-surface-container-low p-7 xl:p-8"> <img${addAttribute(siteSettings.insurance.logo.alt || "Insurance logo", "alt")} class="mb-5 h-16 w-auto object-contain"${addAttribute(siteSettings.insurance.logo.url, "src")}> ${insuranceImage && renderTemplate`<img${addAttribute(insuranceImage.alt || "Travel insurance", "alt")} class="mb-6 h-52 w-full rounded-2xl object-cover"${addAttribute(insuranceImage.url, "src")}>`} <a class="block w-full rounded-full bg-on-tertiary-container px-6 py-4 text-center font-bold text-white transition-opacity hover:opacity-90"${addAttribute(siteSettings.insurance.buyButtonHref, "href")}> ${siteSettings.insurance.buyButtonLabel} </a> </div> </div> </aside> </div> </section> ` })}` : renderTemplate`<section class="mx-auto max-w-container-max px-margin-mobile py-24 md:px-margin-desktop"> <h1 class="mb-4 font-display-lg text-display-lg text-primary">Trip not found</h1> <a class="font-bold text-on-tertiary-container hover:underline" href="/trips">
Back to all trips
</a> </section>`} </main> ${renderComponent($$result2, "Footer", $$Footer, { "active": "trips" })} ` })}`;
}, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/[year]/[slug].astro", void 0);

const $$file = "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/[year]/[slug].astro";
const $$url = "/[year]/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
