import { c as createComponent } from './astro-component_4tyYTbsQ.mjs';
import 'piccolore';
import { m as maybeRenderHead, h as addAttribute, r as renderTemplate, p as renderHead, v as renderSlot } from './entrypoint_CPaYjtce.mjs';
import 'clsx';
import { c as getSiteSettings, l as logo } from './content_Ce3Tp18u.mjs';

const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Footer;
  const { active = "home" } = Astro2.props;
  const siteSettings = await getSiteSettings();
  return renderTemplate`${maybeRenderHead()}<footer class="bg-primary dark:bg-primary-container full-width bottom-0 mt-section-padding"> <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto"> <div class="space-y-4"> <span class="font-headline-md text-headline-md text-tertiary-fixed block">${siteSettings.companyName}</span> <p class="font-body-md text-body-md text-primary-fixed/80"> ${siteSettings.footerBlurb} </p> </div> <div class="space-y-4"> <h6 class="font-label-sm text-label-sm text-white uppercase tracking-widest">Navigation</h6> <div class="grid grid-cols-1 gap-2"> <a${addAttribute(["font-body-md transition-colors", active === "home" ? "text-tertiary-fixed font-bold underline" : "text-primary-fixed/80 hover:text-white"], "class:list")} href="/">Home</a> <a${addAttribute(["font-body-md transition-colors", active === "trips" ? "text-tertiary-fixed font-bold underline" : "text-primary-fixed/80 hover:text-white"], "class:list")} href="/trips">Trips</a> <a${addAttribute(["font-body-md transition-colors", active === "about" ? "text-tertiary-fixed font-bold underline" : "text-primary-fixed/80 hover:text-white"], "class:list")} href="/about">About</a> <a${addAttribute(["font-body-md transition-colors", active === "socials" ? "text-tertiary-fixed font-bold underline" : "text-primary-fixed/80 hover:text-white"], "class:list")} href="/socials">Socials</a> <a${addAttribute(["font-body-md transition-colors", active === "faq" ? "text-tertiary-fixed font-bold underline" : "text-primary-fixed/80 hover:text-white"], "class:list")} href="/faq">FAQ</a> <a${addAttribute(["font-body-md transition-colors", active === "contact" ? "text-tertiary-fixed font-bold underline" : "text-primary-fixed/80 hover:text-white"], "class:list")} href="/contact">Contact</a> </div> </div> <div class="space-y-4"> <h6 class="font-label-sm text-label-sm text-white uppercase tracking-widest">Certifications</h6> ${siteSettings.certifications.map((certification) => renderTemplate`<p class="text-body-md text-primary-fixed/80">${certification}</p>`)} <div class="flex gap-4 mt-4"> ${siteSettings.socialLinks.map((social) => renderTemplate`<a class="text-primary-fixed/80 hover:text-white transition-colors"${addAttribute(social.url, "href")} rel="noreferrer" target="_blank"> ${social.label} </a>`)} </div> </div> </div> <div class="border-t border-white/10 px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto text-center"> <p class="font-label-sm text-label-sm text-primary-fixed/60">
&copy; 2026 ${siteSettings.companyName} LLC. All Rights Reserved. ${siteSettings.tagline} </p> </div> </footer>`;
}, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const { active = "home" } = Astro2.props;
  const navItems = [
    { key: "home", label: "Home", href: "/" },
    { key: "trips", label: "Trips", href: "/trips" },
    { key: "about", label: "About", href: "/about" },
    { key: "socials", label: "Socials", href: "/socials" },
    { key: "faq", label: "FAQ", href: "/faq" }
  ];
  return renderTemplate(_a || (_a = __template(["", '<header class="bg-surface/80 dark:bg-surface-container-highest/80 backdrop-blur-md border-b border-outline-variant/30 dark:border-outline/20 shadow-sm dark:shadow-none docked full-width top-0 sticky z-50"> <div class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4 max-w-container-max mx-auto"> <a class="inline-flex items-center" href="/" aria-label="Undersea Expeditions home"> <img', "", "", ' alt="Undersea Expeditions" class="h-16 w-auto md:h-[4.5rem]"> </a> <nav class="hidden md:flex items-center gap-8"> ', ' </nav> <div class="hidden md:flex items-center gap-4"> <a class="bg-on-tertiary-container text-white px-6 py-2 rounded-full font-label-sm text-label-sm uppercase tracking-wider hover:opacity-90 transition-all" href="/contact">\nContact Us\n</a> </div> <button class="md:hidden inline-flex items-center justify-center rounded-full border border-outline-variant/40 p-2 text-primary" type="button" aria-expanded="false" aria-controls="mobile-nav" data-nav-toggle> <span class="material-symbols-outlined">menu</span> </button> </div> <div id="mobile-nav" class="hidden border-t border-outline-variant/30 bg-surface-container-low/95 md:hidden" data-mobile-nav> <nav class="px-margin-mobile py-4"> <div class="flex flex-col gap-4"> ', ' </div> </nav> </div> </header> <script>\n  const toggle = document.querySelector("[data-nav-toggle]");\n  const nav = document.querySelector("[data-mobile-nav]");\n\n  if (toggle && nav) {\n    toggle.addEventListener("click", () => {\n      const isOpen = toggle.getAttribute("aria-expanded") === "true";\n      toggle.setAttribute("aria-expanded", String(!isOpen));\n      nav.classList.toggle("hidden", isOpen);\n    });\n  }\n<\/script>'])), maybeRenderHead(), addAttribute(logo.src, "src"), addAttribute(logo.width, "width"), addAttribute(logo.height, "height"), navItems.map((item) => renderTemplate`<a${addAttribute([
    "font-body-md text-body-md transition-colors relative pb-1",
    active === item.key ? "text-primary border-b-2 border-on-tertiary-container font-bold" : "text-primary hover:text-on-tertiary-container"
  ], "class:list")}${addAttribute(item.href, "href")}> ${item.label} </a>`), navItems.map((item) => renderTemplate`<a${addAttribute([
    "font-body-md text-body-md transition-colors",
    active === item.key ? "text-primary font-bold" : "text-primary hover:text-on-tertiary-container"
  ], "class:list")}${addAttribute(item.href, "href")}> ${item.label} </a>`));
}, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/components/Header.astro", void 0);

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { title, bodyClass = "bg-background text-on-background font-body-md" } = Astro2.props;
  return renderTemplate`<html class="light" lang="en"> <head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><title>${title}</title><link href="https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">${renderHead()}</head> <body${addAttribute(bodyClass, "class")}> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/layouts/Layout.astro", void 0);

export { $$Layout as $, $$Header as a, $$Footer as b };
