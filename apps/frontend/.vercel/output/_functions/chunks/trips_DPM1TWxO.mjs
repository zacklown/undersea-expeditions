import { c as createComponent } from './astro-component_4tyYTbsQ.mjs';
import 'piccolore';
import { n as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_CPaYjtce.mjs';
import { r as renderScript } from './script_DWPeTHg-.mjs';
import { $ as $$Layout, a as $$Header, b as $$Footer } from './Layout_COaTERnD.mjs';
import { i as getTripsPageContent, d as getTrips } from './content_Ce3Tp18u.mjs';

const $$Trips = createComponent(async ($$result, $$props, $$slots) => {
  const [pageContent, allTrips] = await Promise.all([getTripsPageContent(), getTrips()]);
  const now = /* @__PURE__ */ new Date();
  const currentYear = now.getUTCFullYear();
  const currentMonthKey = `${currentYear}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;
  const visibleYears = Array.from({ length: 3 }, (_, index) => currentYear + index);
  function getMonthKey(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
  }
  function getLocationOptions(trips2) {
    const groups = /* @__PURE__ */ new Map();
    for (const trip of trips2) {
      const regionLabel = trip.regionLabel?.trim();
      if (!regionLabel) continue;
      const group = groups.get(regionLabel) || {
        countries: /* @__PURE__ */ new Map(),
        region: {
          label: regionLabel,
          value: `region::${regionLabel}`
        }
      };
      for (const country of trip.countries) {
        const countryLabel = country?.trim();
        if (!countryLabel) continue;
        group.countries.set(countryLabel, {
          label: countryLabel,
          value: `country::${countryLabel}`
        });
      }
      groups.set(regionLabel, group);
    }
    return Array.from(groups.entries()).sort(([left], [right]) => left.localeCompare(right)).map(([, group]) => ({
      ...group,
      countries: Array.from(group.countries.values()).sort(
        (left, right) => left.label.localeCompare(right.label)
      )
    }));
  }
  const trips = allTrips.filter((trip) => visibleYears.includes(trip.tripYear)).filter((trip) => {
    const monthKey = getMonthKey(trip.tripStart);
    return monthKey ? monthKey >= currentMonthKey : trip.tripYear >= currentYear;
  }).sort((left, right) => {
    const leftDate = left.tripStart ? new Date(left.tripStart).getTime() : Number.MAX_SAFE_INTEGER;
    const rightDate = right.tripStart ? new Date(right.tripStart).getTime() : Number.MAX_SAFE_INTEGER;
    return leftDate - rightDate;
  });
  const locationOptions = getLocationOptions(trips);
  const yearCalendars = visibleYears.map((year) => {
    const months = Array.from({ length: 12 }, (_, monthIndex) => {
      const monthValue = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
      const matchingTrips = trips.filter((trip) => getMonthKey(trip.tripStart) === monthValue);
      return {
        count: matchingTrips.length,
        label: new Intl.DateTimeFormat("en-US", {
          month: "short",
          timeZone: "UTC"
        }).format(new Date(Date.UTC(year, monthIndex, 1))),
        value: monthValue
      };
    });
    return {
      year,
      hasTrips: months.some((month) => month.count > 0),
      months
    };
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Trips | Undersea Expeditions" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "active": "trips" })} ${maybeRenderHead()}<main> <section class="mx-auto max-w-container-max px-margin-mobile py-16 md:px-margin-desktop md:py-20" data-trip-search> <div class="rounded-3xl border border-secondary-fixed/60 bg-white p-6 shadow-sm md:p-8"> <div class="mb-8 flex flex-col gap-3"> <h2 class="font-headline-lg text-headline-lg text-primary">Find Your Trip</h2> <p class="max-w-3xl text-body-md text-secondary">
Narrow departures by month, destination, or trip type. Open the calendar to browse this
            year and the next two years. Passed month and year combinations disappear automatically.
</p> </div> <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)_minmax(0,1fr)_auto] xl:items-end"> <div class="relative"> <span class="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-on-tertiary-container">
Month and Year
</span> <button class="flex w-full items-center justify-between rounded-xl border border-secondary-fixed bg-surface px-4 py-3 text-left text-primary" data-calendar-trigger type="button"> <span data-calendar-trigger-label>All future departures</span> <span class="material-symbols-outlined text-on-tertiary-container">calendar_month</span> </button> <input data-filter-months type="hidden" value=""> <div class="absolute left-0 top-[calc(100%+0.75rem)] z-20 hidden w-full min-w-[320px] rounded-3xl border border-secondary-fixed/60 bg-white p-4 shadow-[0_24px_80px_rgba(4,44,72,0.16)] xl:w-[720px]" data-calendar-panel> <div class="mb-4 flex items-center justify-between gap-4"> <div> <p class="text-sm font-bold uppercase tracking-[0.14em] text-on-tertiary-container">Departure Calendar</p> <p class="mt-1 text-sm text-secondary">Choose any mix of future months, or click a year to select every available month in it.</p> </div> <button class="text-sm font-bold text-on-tertiary-container hover:underline" data-calendar-clear type="button">
Clear
</button> </div> <div class="grid gap-4 lg:grid-cols-3"> ${yearCalendars.map((yearCalendar) => renderTemplate`<section class="overflow-hidden rounded-3xl border border-secondary-fixed/60 bg-white shadow-sm"> <button class="flex w-full items-center justify-between border-b border-secondary-fixed/40 bg-primary px-5 py-4 text-left text-white transition-colors hover:bg-on-tertiary-container"${addAttribute(yearCalendar.year, "data-calendar-year")}${addAttribute(yearCalendar.hasTrips ? "true" : "false", "data-calendar-year-has-trips")} type="button"> <h3 class="font-headline-md text-headline-md">${yearCalendar.year}</h3> ${yearCalendar.hasTrips && renderTemplate`<span class="text-xs font-bold uppercase tracking-[0.14em] text-white/80">Select all</span>`} </button> ${yearCalendar.hasTrips ? renderTemplate`<div class="grid grid-cols-3 gap-2 p-4"> ${yearCalendar.months.map((month) => renderTemplate`<button${addAttribute([
    "rounded-2xl border px-3 py-3 text-center transition-colors",
    month.count > 0 ? "border-secondary-fixed bg-secondary-container text-primary hover:bg-primary hover:text-white" : "border-secondary-fixed/40 bg-surface text-secondary/45"
  ], "class:list")}${addAttribute(month.count > 0 ? month.value : void 0, "data-calendar-month")}${addAttribute(month.count > 0 ? `${month.label} ${yearCalendar.year}` : void 0, "data-calendar-month-label")}${addAttribute(month.count === 0, "disabled")} type="button"> <span class="block text-sm font-bold uppercase tracking-[0.14em]">${month.label}</span> <span class="mt-1.5 inline-block whitespace-nowrap text-[11px]"> ${month.count > 0 ? `${month.count} trip${month.count === 1 ? "" : "s"}` : " "} </span> </button>`)} </div>` : renderTemplate`<div class="flex min-h-[210px] items-center justify-center p-6 text-center"> <div> <p class="text-label-sm font-label-sm uppercase tracking-[0.18em] text-on-tertiary-container"> ${yearCalendar.year} </p> <p class="mt-3 font-headline-md text-headline-md text-primary">Coming Soon</p> </div> </div>`} </section>`)} </div> </div> </div> <div class="relative"> <span class="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-on-tertiary-container">
Location / Region
</span> <button class="flex w-full items-center justify-between rounded-xl border border-secondary-fixed bg-surface px-4 py-3 text-left text-primary" data-location-trigger type="button"> <span data-location-trigger-label>All locations</span> <span class="material-symbols-outlined text-on-tertiary-container">expand_more</span> </button> <input data-filter-locations type="hidden" value=""> <div class="absolute left-0 top-[calc(100%+0.75rem)] z-20 hidden w-full rounded-3xl border border-secondary-fixed/60 bg-white p-3 shadow-[0_24px_80px_rgba(4,44,72,0.16)]" data-location-panel> <div class="mb-2 flex items-center justify-between gap-4 px-2 py-1"> <p class="text-sm font-bold uppercase tracking-[0.14em] text-on-tertiary-container">
Browse Regions
</p> <button class="text-sm font-bold text-on-tertiary-container hover:underline" data-location-clear type="button">
Clear
</button> </div> <div class="max-h-[320px] space-y-3 overflow-y-auto pr-1"> ${locationOptions.map((group) => renderTemplate`<div class="border-b border-secondary-fixed/30 pb-3 last:border-b-0 last:pb-0"> <button class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-primary transition-colors hover:bg-secondary-container"${addAttribute(group.region.value, "data-location-region")}${addAttribute(group.region.label, "data-location-region-label")} type="button"> <span class="font-bold uppercase tracking-[0.1em]">${group.region.label}</span> <span class="text-xs font-bold uppercase tracking-[0.14em] text-on-tertiary-container">
All locations
</span> </button> <div class="mt-1 space-y-1"> ${group.countries.map((option) => renderTemplate`<button class="flex w-full items-center rounded-xl px-3 py-2 pl-8 text-left text-secondary transition-colors hover:bg-secondary-container hover:text-primary"${addAttribute(option.value, "data-location-option")}${addAttribute(option.label, "data-location-label")}${addAttribute(group.region.value, "data-location-parent")} type="button"> <span class="mr-2 text-on-tertiary-container/70">-</span> <span>${option.label}</span> </button>`)} </div> </div>`)} </div> </div> </div> <div class="relative"> <span class="mb-2 block text-sm font-bold uppercase tracking-[0.14em] text-on-tertiary-container">
Trip Type
</span> <button class="flex w-full items-center justify-between rounded-xl border border-secondary-fixed bg-surface px-4 py-3 text-left text-primary" data-gender-trigger type="button"> <span data-gender-trigger-label>All trips</span> <span class="material-symbols-outlined text-on-tertiary-container">expand_more</span> </button> <input data-filter-genders type="hidden" value=""> <div class="absolute left-0 top-[calc(100%+0.75rem)] z-20 hidden w-full rounded-3xl border border-secondary-fixed/60 bg-white p-3 shadow-[0_24px_80px_rgba(4,44,72,0.16)]" data-gender-panel> <div class="mb-2 flex items-center justify-between gap-4 px-2 py-1"> <p class="text-sm font-bold uppercase tracking-[0.14em] text-on-tertiary-container">
Trip Type
</p> <button class="text-sm font-bold text-on-tertiary-container hover:underline" data-gender-clear type="button">
Clear
</button> </div> <div class="space-y-1"> <button class="flex w-full items-center rounded-xl px-3 py-2 text-left text-secondary transition-colors hover:bg-secondary-container hover:text-primary" data-gender-option="" data-gender-label="All trips" type="button">
All trips
</button> <button class="flex w-full items-center rounded-xl px-3 py-2 text-left text-secondary transition-colors hover:bg-secondary-container hover:text-primary" data-gender-option="male" data-gender-label="Men Only" type="button">
Men Only
</button> <button class="flex w-full items-center rounded-xl px-3 py-2 text-left text-secondary transition-colors hover:bg-secondary-container hover:text-primary" data-gender-option="mixed" data-gender-label="Coed" type="button">
Coed
</button> <button class="flex w-full items-center rounded-xl px-3 py-2 text-left text-secondary transition-colors hover:bg-secondary-container hover:text-primary" data-gender-option="female" data-gender-label="For Women Only" type="button">
For Women Only
</button> </div> </div> </div> <div> <button class="inline-flex w-full items-center justify-center rounded-xl bg-primary px-6 py-3 font-bold text-white transition-colors hover:bg-on-tertiary-container" data-view-results type="button">
View ${trips.length} trips
</button> </div> </div> </div> </section> <section class="mx-auto max-w-container-max px-margin-mobile pb-20 md:px-margin-desktop" id="trip-results"> <div class="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"> <div> <h2 class="font-headline-lg text-headline-lg text-primary">Available Departures</h2> <p class="mt-2 text-body-md text-secondary"> <span data-results-count>${trips.length}</span> matching trip<span data-results-plural>s</span> </p> </div> </div> <div class="hidden rounded-2xl border border-dashed border-secondary-fixed/70 bg-surface-container-low px-6 py-10 text-center" data-empty-state> <p class="font-headline-md text-headline-md text-primary">No trips match those filters yet.</p> <p class="mt-3 text-body-md text-secondary">Try another month, destination, or trip type.</p> </div> <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" data-trip-results> ${trips.map((trip) => renderTemplate`<article class="group relative flex h-[39rem] flex-col overflow-hidden rounded-2xl border border-secondary-fixed bg-white shadow-sm transition-shadow hover:shadow-xl" data-trip-card${addAttribute(trip.countries.join("|"), "data-trip-countries")}${addAttribute(trip.gender || "", "data-trip-gender")}${addAttribute(getMonthKey(trip.tripStart), "data-trip-month")}${addAttribute(trip.regionLabel, "data-trip-region")}${addAttribute(trip.tripYear, "data-trip-year")}> <div class="relative h-60 overflow-hidden md:h-64"> <img${addAttribute(trip.coverImage.alt || trip.title, "alt")} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"${addAttribute(trip.coverImage.url, "src")}> <div class="absolute left-4 top-4 rounded bg-white/90 px-3 py-1 text-label-sm font-label-sm text-primary backdrop-blur-md">${trip.regionLabel}</div> ${trip.isNew && renderTemplate`<div class="absolute right-4 top-4 rounded bg-[#C5A059] px-3 py-1 text-label-sm font-label-sm text-white">New</div>`} </div> <div class="flex flex-1 flex-col p-6"> <h3 class="mb-2 font-headline-md text-headline-md text-primary">${trip.title}</h3> <p class="mb-2 text-secondary">${trip.countries.join(", ")}</p> <p class="mb-4 font-bold text-on-tertiary-container">${trip.dateLabel}</p> ${trip.groupTypeLabel && renderTemplate`<p class="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-on-tertiary-container"> ${trip.groupTypeLabel} </p>`} <p class="mb-6 font-body-md text-body-md text-secondary">${trip.summary}</p> <a class="mt-auto block w-full rounded-lg border border-primary py-3 text-center font-bold text-primary transition-all group-hover:bg-primary group-hover:text-white"${addAttribute(trip.path, "href")}>Details &amp; Booking</a> </div> </article>`)} </div> </section> </main> ${renderComponent($$result2, "Footer", $$Footer, { "active": "trips" })} ` })} ${renderScript($$result, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/trips.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/trips.astro", void 0);

const $$file = "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/pages/trips.astro";
const $$url = "/trips";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Trips,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
