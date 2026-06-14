function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function formatText(node) {
  let text = escapeHtml(node.text || "");
  if (node.format && (node.format & 1) === 1) text = `<strong>${text}</strong>`;
  if (node.format && (node.format & 2) === 2) text = `<em>${text}</em>`;
  if (node.format && (node.format & 8) === 8) text = `<u>${text}</u>`;
  if (node.format && (node.format & 4) === 4) text = `<s>${text}</s>`;
  return text;
}
function renderNode(node) {
  if (!node) return "";
  if (node.type === "text") return formatText(node);
  if (node.type === "linebreak") return "<br />";
  const children = (node.children || []).map((child) => renderNode(child)).join("");
  switch (node.type) {
    case "paragraph":
      return children ? `<p>${children}</p>` : "";
    case "heading":
      return `<${node.tag || "h2"}>${children}</${node.tag || "h2"}>`;
    case "list":
      return node.listType === "number" ? `<ol>${children}</ol>` : `<ul>${children}</ul>`;
    case "listitem":
      return `<li>${children}</li>`;
    case "quote":
      return `<blockquote>${children}</blockquote>`;
    case "link": {
      const href = escapeHtml(node.fields?.url || "#");
      const target = node.fields?.newTab ? ` target="_blank" rel="noreferrer"` : "";
      return `<a href="${href}"${target}>${children}</a>`;
    }
    default:
      return children;
  }
}
function renderRichText(value) {
  if (!value) return "";
  if (typeof value === "string") return `<p>${escapeHtml(value)}</p>`;
  const root = value;
  const children = root.root?.children || [];
  return children.map((child) => renderNode(child)).join("");
}

const logo = new Proxy({"src":"/_astro/underseax-logo.Bk6U1KAb.png","width":891,"height":891,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/zackl/Documents/GitHub/undersea-expeditions/apps/frontend/src/assets/underseax-logo.png";
							}
							
							return target[name];
						}
					});

const DEFAULT_CMS_API_URL = "http://127.0.0.1:3001/api";
const cmsApiUrl = DEFAULT_CMS_API_URL;
const cmsPublicOrigin = (DEFAULT_CMS_API_URL).replace(/\/api\/?$/, "");
const homeHeroImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuA4SJlxoT5Jt-S5PRXOoSfDzJQgeMe0CnJkrJJRMVkTUJyJComrz9sj-P3DR4urnTSc6npm43IUFY8NXu6rtN8ocICycAOJ5hi9TKKDYBhltyTJw2YME6ZlIaCP8C3aQxK6kXs19uc31q_tpsef3HMdkAU1FhA7QoUoCp_rDXp46MUxB4GSzoGR2khvsk-H1qrcNpyCfegDbbTgEzlNkGu3wz46EfvdLutcDndUft4-Oxqg_2yitMvw0YEO5NUk8B5FdmSDJklO41xG";
const featuredTripImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDo6Bec8ZPLRMt1jWuGWse8bBANZl95yo_BwKR5rm478joy2U0CoSnlcQ5LtCnuXWgbxL8vae7vjePIv1NdNeaj8hBeOiIwvWRuK8JW1Lv4sGZ6lC1sgoKgsqEi55UkighzrwFaAGBL5OmueruUhO0g8IdclnoEdh261_BRv-mZWbaIu5S67lZUn0Pk_i2QOpWqKx7j6fX-gw_wiiaD_IlY2RpEndOouhfjTjXYfqSNmPv45cq8jMfeoTnTLXxmHJkAMetgTXxJIz28";
const storyImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDN7sYwACIUC--LW0G4KjzZKdeS6UDelcpQOarLGy6Ovga0ffJWJsPpbKoDWjOO_wtuuKCpfprzF3bspUpZGP4V2wYhlUVnY2A3ha2CSvKiUowPWeNlL-f8S1cY886x9RAcN6zZObjb3eZMHptTqERbgVGnj6CGxVARTL7Jhrkfp1y18SKeDXhQ9-nTpNStKYHjq8ktXV0WTxefUoYmRJXK-jAF4dDCJ-w7Ok1mbm28XFq-U_v8Mq2xxDXMDwjptVNj1sBUM8ervD0M";
const contactImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAtebHlrWhl-0uhXtSPKVk8B0KdaPxc0XXBMCmOUsfbtJtNam8tYjRoO5Uk8PnP1Z1XlIoOgKVgBsbr5AYD-tHhvSX6QImayLUeGm1ui1c9QLcAlPs8d5nFyUt4rLVGpTOQj5reqZ-8CgQSDzseUYdfT7g7jUjZZB57eomzycfzf7O5YdOBfDkKPt4dUw5ItU4P1QsAyww-D0Qc8fwSDkMq-44vJsVF4H5rBu2IP9BxBB7IUyc3V-985EKYcHX8Tz34I5DOy9s8eAbY";
const fallbackTrips = [
  {
    bannerImage: { alt: "Saba Expedition", url: featuredTripImage },
    bookingHref: "/contact",
    bookingLabel: "Reserve Your Spot",
    overview: "Join us in the Unspoiled Queen of the Caribbean for a week of dramatic volcanic pinnacles, lush reefs, and a social onboard atmosphere built for LGBTQ+ divers.",
    coverImage: { alt: "Saba Expedition", url: featuredTripImage },
    countries: ["Saba"],
    dateLabel: "October 17-24, 2026",
    featuredOnHomepage: true,
    id: "trip-saba",
    insuranceImage: void 0,
    legacyUrl: "/gay-scuba-trips/saba.html",
    mapPin: { color: "gold", showOnHomepage: true, xPercent: 28.4, yPercent: 43.5 },
    path: "/2026/lgbtq-scuba-saba",
    regionLabel: "SABA",
    stays: ["Juliana's Hotel"],
    slug: "lgbtq-scuba-saba",
    summary: "Join us for an exclusive week in the Unspoiled Queen of the Caribbean, with Sea & Learn programming and a warm, community-first atmosphere.",
    title: "LGBTQ+ Scuba Saba",
    tripEnd: "2026-10-24T00:00:00.000Z",
    tripStart: "2026-10-17T00:00:00.000Z",
    tripYear: 2026,
    tripStyle: "land-resort"
  },
  {
    bannerImage: {
      alt: "Red Sea",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlPUIVi1CcXvmr1q1Ys3FSJDneOpJbw_vknGnvYLDjj5r0aS7pVnaXuyyNVGbewNztVq_aTE8ks2XwtpKRawDB8NomyfkLWQLPJYl8JaY-SauTrkHM09YZPOhcHwr9EBnfG4tRk7jWtS4cEBBG1FMvsnFTf6lXoqlfaQGa6ImzuoOIQewVeF7ln_qVYA6G9xkfUGGfv34b55xt-zjBIzLBX-R4NqBrQVQ-2TIWvLvyaZhBNIq2vEwJw7ciZS-fiAPkJy3p7quyf8wW"
    },
    bookingHref: "/contact",
    bookingLabel: "Details & Booking",
    overview: "Explore the legendary Red Sea with pristine house reefs, strong hospitality, and a trip design tuned for women who want both diving and community.",
    coverImage: {
      alt: "Red Sea",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlPUIVi1CcXvmr1q1Ys3FSJDneOpJbw_vknGnvYLDjj5r0aS7pVnaXuyyNVGbewNztVq_aTE8ks2XwtpKRawDB8NomyfkLWQLPJYl8JaY-SauTrkHM09YZPOhcHwr9EBnfG4tRk7jWtS4cEBBG1FMvsnFTf6lXoqlfaQGa6ImzuoOIQewVeF7ln_qVYA6G9xkfUGGfv34b55xt-zjBIzLBX-R4NqBrQVQ-2TIWvLvyaZhBNIq2vEwJw7ciZS-fiAPkJy3p7quyf8wW"
    },
    countries: ["Egypt"],
    dateLabel: "October 11-18, 2026",
    featuredOnHomepage: true,
    id: "trip-red-sea",
    insuranceImage: void 0,
    mapPin: { color: "coral", showOnHomepage: true, xPercent: 58.5, yPercent: 46.2 },
    path: "/2026/marsa-shagra-dive-village",
    regionLabel: "RED SEA",
    stays: ["Marsa Shagra Dive Village"],
    slug: "marsa-shagra-dive-village",
    summary: "Explore the legendary Red Sea for women only, featuring pristine house reefs and world-class hospitality.",
    title: "Marsa Shagra Dive Village",
    tripEnd: "2026-10-18T00:00:00.000Z",
    tripStart: "2026-10-11T00:00:00.000Z",
    tripYear: 2026,
    tripStyle: "land-resort"
  },
  {
    bannerImage: {
      alt: "La Paz",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC56og5pfXNSCbdx3GnLnULIShYtyXbrXCmLdEW9jvVauWpnaLN-tNjFT6A8-m4mU8WxCarO9ptWp6SV5hh6sVBdxcfSTKWBZANeBjfvZTVOkidc3agefFe--3L3ZqEq0A_DeVMBuhwrOqk8WXXqQtOlHnq5wfMPw4md9h_IE2hIh4SsnvnHcgy82g-jAqhBkwJYAFHDNplfOuB8J4P3OL0C61MBeisbu2_FM4pBRK9nDd5RO5OnlgaHby-eUHRkTggbFfrU5QQINu8"
    },
    bookingHref: "/contact",
    bookingLabel: "Details & Booking",
    overview: "Dive the Sea of Cortez for sea lion encounters, whale shark sightings, and relaxed Baja energy with a group that actually wants to hang out after the dives.",
    coverImage: {
      alt: "La Paz",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC56og5pfXNSCbdx3GnLnULIShYtyXbrXCmLdEW9jvVauWpnaLN-tNjFT6A8-m4mU8WxCarO9ptWp6SV5hh6sVBdxcfSTKWBZANeBjfvZTVOkidc3agefFe--3L3ZqEq0A_DeVMBuhwrOqk8WXXqQtOlHnq5wfMPw4md9h_IE2hIh4SsnvnHcgy82g-jAqhBkwJYAFHDNplfOuB8J4P3OL0C61MBeisbu2_FM4pBRK9nDd5RO5OnlgaHby-eUHRkTggbFfrU5QQINu8"
    },
    countries: ["Mexico"],
    dateLabel: "November 21-28, 2026",
    featuredOnHomepage: true,
    id: "trip-la-paz",
    insuranceImage: void 0,
    mapPin: { color: "seafoam", showOnHomepage: true, xPercent: 18.3, yPercent: 44.8 },
    path: "/2026/la-paz-baja-california",
    regionLabel: "MEXICO",
    stays: ["La Paz Resort"],
    slug: "la-paz-baja-california",
    summary: `Dive the Sea of Cortez, the "world's aquarium," for sea lion encounters and whale shark sightings.`,
    title: "La Paz, Baja California",
    tripEnd: "2026-11-28T00:00:00.000Z",
    tripStart: "2026-11-21T00:00:00.000Z",
    tripYear: 2026,
    tripStyle: "land-resort"
  },
  {
    bannerImage: {
      alt: "Maldives",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBycCrQqKtoSOqz6jXNXXD37n9FYxOosdJSN_Ai2pQI1kapCZjwJyd-CChOg6a6lMURhqXmAcfbC-9vRWs3IPdIRa_z_MEeZ7JWrTCDuryIWDwiLM_D3lZe3hOUmITbyVZbugpCsrzRBm1uWa8M1UgiakpZeb2eU8M5cVbE8NrbMyWnVZfZ8BN9p65avRT2JR1MScukUTi8XsNmDsMBHp0clenKkKpF3l4c6Ftz7Fd_bJKbGAT6APHDpapGzLWRhSXMCkj8hiXcpHGo"
    },
    bookingHref: "/contact",
    bookingLabel: "Details & Booking",
    overview: "Board a luxury liveaboard for manta action, current-swept channels, and the kind of polished logistics that let you focus on the diving.",
    coverImage: {
      alt: "Maldives",
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBycCrQqKtoSOqz6jXNXXD37n9FYxOosdJSN_Ai2pQI1kapCZjwJyd-CChOg6a6lMURhqXmAcfbC-9vRWs3IPdIRa_z_MEeZ7JWrTCDuryIWDwiLM_D3lZe3hOUmITbyVZbugpCsrzRBm1uWa8M1UgiakpZeb2eU8M5cVbE8NrbMyWnVZfZ8BN9p65avRT2JR1MScukUTi8XsNmDsMBHp0clenKkKpF3l4c6Ftz7Fd_bJKbGAT6APHDpapGzLWRhSXMCkj8hiXcpHGo"
    },
    countries: ["Maldives"],
    dateLabel: "February 17-27, 2027",
    featuredOnHomepage: true,
    id: "trip-maldives",
    insuranceImage: void 0,
    legacyUrl: "/gay-scuba-trips/maldives.html",
    mapPin: { color: "deep-blue", showOnHomepage: true, xPercent: 68.7, yPercent: 58.6 },
    path: "/2027/magic-of-the-maldives",
    regionLabel: "MALDIVES",
    stays: ["Luxury Liveaboard"],
    slug: "magic-of-the-maldives",
    summary: "A luxury liveaboard expedition through the central atolls, seeking mantas and breathtaking reefs.",
    title: "Magic of the Maldives",
    tripEnd: "2027-02-27T00:00:00.000Z",
    tripStart: "2027-02-17T00:00:00.000Z",
    tripYear: 2027,
    tripStyle: "liveaboard"
  }
];
const fallbackFaqs = [
  {
    answer: "No. Some trips suit newer divers and some are intended for more experienced guests. We help place you on the right departure.",
    category: "Experience Levels",
    id: "faq-1",
    question: "Do I need to be an advanced diver?"
  },
  {
    answer: "Yes. The social atmosphere is a core part of the experience, not an afterthought.",
    category: "Community",
    id: "faq-2",
    question: "Are trips community-focused?"
  },
  {
    answer: "Yes. Use the contact page to ask about destinations, dive requirements, cabins, or itinerary fit.",
    category: "Booking",
    id: "faq-3",
    question: "Can I ask questions before booking?"
  },
  {
    answer: "Examples include Saba, the Red Sea, Baja California, the Maldives, and additional curated departures by season.",
    category: "Destinations",
    id: "faq-4",
    question: "What destinations are offered?"
  }
];
const fallbackSiteSettings = {
  certifications: ["Hawaii TAR 6711", "CST 2072890-40"],
  companyName: "Undersea Expeditions",
  contact: {
    addressLines: ["758 Kapahulu Ave, #100-1188", "Honolulu, HI 96816", "USA"],
    email: "info@UnderseaX.com",
    internationalPhone: "+1 858-270-2900",
    tollFreePhone: "1-800-669-0310"
  },
  footerBlurb: "Gay and Lesbian Scuba Dive Travel Experts since 1991. Leading the world in community-focused aquatic adventures.",
  insurance: {
    buyButtonHref: "/contact",
    buyButtonLabel: "Buy Insurance",
    defaultImage: { alt: "Travel insurance planning", url: featuredTripImage },
    logo: { alt: "Insurance logo", url: logo.src }
  },
  socialLinks: [
    { label: "Facebook", url: "https://www.facebook.com/GayScuba/" },
    { label: "Instagram", url: "https://www.instagram.com/gayscuba/?hl=en" }
  ],
  tagline: "World-class diving and community-driven travel for the LGBTQ+ community since 1991."
};
const fallbackHomePage = {
  cta: {
    description: "Our experts are ready to help you plan your next underwater adventure. Reach out today for specialized trip details and availability.",
    emailLabel: "EMAIL OUR TEAM",
    phoneLabel: "CALL US TOLL-FREE",
    title: "Ready to Dive In?"
  },
  featuredTrips: {
    description: "A rotating look at the departures we want front and center right now.",
    title: "Featured Trips"
  },
  hero: {
    description: fallbackSiteSettings.tagline,
    image: { alt: "Experience the freedom of the deep", url: homeHeroImage },
    logo: void 0,
    primaryCtaHref: "/trips",
    primaryCtaLabel: "Book Your Journey",
    secondaryCtaHref: "/socials",
    secondaryCtaLabel: "Explore Socials",
    title: "Experience the Freedom of the Deep"
  },
  mapSection: {
    buttonHref: "/trips",
    buttonLabel: "See More Trips",
    description: "Each pin links directly to a trip page, so you can jump from the map into dates, itinerary, and booking details.",
    title: "Explore Where The Next Expeditions Go"
  },
  story: {
    body: [
      "Scuba diving is more fun when it's shared with friends. Friends who share our values, humor, and lifestyle. New friends are what we make on our Undersea Expeditions, exploring the world and having a great time doing it.",
      "We dive the clear, warm waters of our planet's most exciting and exotic locations in the company of friends. We offer trips for all levels of divers, from instruction for new divers to advanced destinations for the experienced."
    ],
    buttonHref: "/about",
    buttonLabel: "About Us",
    image: { alt: "Community of divers", url: storyImage },
    title: "Dive with Friends, Explore the World"
  }
};
const fallbackTripsPage = {
  description: "Discover our upcoming curated global expeditions, built around strong diving, polished logistics, and the kind of social atmosphere that keeps people coming back.",
  title: "2026 & 2027 Vacations"
};
const fallbackSocialsPage = {
  description: "Follow the latest trip moments, traveler updates, and underwater highlights across our social channels.",
  latestSocialMoments: {
    description: "A quick look at the trips, travelers, and underwater moments we are sharing across Instagram and Facebook.",
    tiles: [
      {
        buttonLabel: "Open Instagram",
        description: "Behind-the-scenes moments, trip highlights, and underwater snapshots from the road.",
        eyebrow: "Instagram",
        href: "https://www.instagram.com/gayscuba/?hl=en",
        image: {
          alt: "Travelers on yacht deck",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYz-A_ur5AOab3Z-oL6KSdxUlPQOC0awWQLwhO5kqZK1UDl010zUBFT59fcxkYjkXkKUq0c8CGIiFlT3-jePnNHEvmxLNb_ZN1b4f2YaHXI6Xhkou_N_z6QObjB-GUs_ige8bdusl9tprc0TCFg_PYpbI0tkN3E8gtQ-BzyLn2ssQU2OHHqRY6RSbQQiQSRh3GPv-FHVznRtFJeUaJ734izKC-66-d-3-LI2kwPxU-GrF32IFhciQydfVakL5ZuuYqojlJyrhKFTp2"
        },
        title: "On Deck in the Maldives"
      },
      {
        buttonLabel: "Open Facebook",
        description: "Announcements, traveler updates, and community check-ins from Undersea Expeditions.",
        eyebrow: "Facebook",
        href: "https://www.facebook.com/GayScuba/",
        image: {
          alt: "Vibrant coral detail",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtXG5a_JwFt4BPq8cqmrG3pvmOO9DZpvPrFfx7-B9O5EeqWQ-K8nMhmuyGBO6KcUb1SVnFtvJx89b5OHjoUHTrcVZSj7g0YSQUiTPE_oNRWm1LgC4mdk3DcpOQOsgt8qjqB74NT5LpwBcCmqxNT-HWmfzXpObkj-PckIQmwdnbySAcAPAUcTcwkvHLECYtpSAZ6M2CyyumQFgSeeyBEhvVVboLezvZYeHI9cMgh_k8MJjOGMLtZmisccfKXKEPB_nKdWzZfeG-KDhr"
        },
        title: "Reef Highlights"
      },
      {
        buttonLabel: "Open Instagram",
        description: "Divers, reef scenes, and trip energy from recent expeditions.",
        eyebrow: "Instagram",
        href: "https://www.instagram.com/gayscuba/?hl=en",
        image: {
          alt: "Divers exploring the reef",
          url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbhQM8shZzX_biIIIYFX_v7DJrfoP66BEdKVEb_7KVSVV4A36ze4iFO_A09fyxvu9bDfWMnF8cwD2dyZWdaAqAavDxdKbuJAJEa9yibT56ly6evCMvZIZ52Z5hSPaeuhHMe_zh1QR9DnLY2IOtWQjzfJ38pLz556agiyB2zKRvhTK2sT9fwLsDwy2PH31knIv5VScCFCQoeY9qRsPzE5Ia3jrmuNlnlpMVuEjffaSkNcY5VEPKXv13z1ouKHKi0ir6TR7s9I36ijkl"
        },
        title: "Underwater Moments"
      }
    ],
    title: "Latest Social Moments"
  },
  socialLinks: [
    {
      buttonLabel: "Open Instagram",
      description: "Behind-the-scenes moments, trip highlights, and underwater snapshots from the road.",
      eyebrow: "Instagram",
      href: "https://www.instagram.com/gayscuba/?hl=en",
      title: "Gay Scuba on Instagram"
    },
    {
      buttonLabel: "Open Facebook",
      description: "Announcements, traveler updates, and community check-ins from Undersea Expeditions.",
      eyebrow: "Facebook",
      href: "https://www.facebook.com/GayScuba/",
      title: "Gay Scuba on Facebook"
    }
  ],
  title: "Dive Into Socials"
};
const fallbackFAQPage = {
  description: "Practical answers about certification, trip fit, and how the Undersea Expeditions community works.",
  highlights: [
    {
      description: "We are CST 2072890-40 certified experts in LGBTQ+ dive travel.",
      icon: "verified_user",
      title: "Accreditation"
    },
    {
      description: "From Open Water to Dive Masters, we cater to all skill levels on deck.",
      icon: "water_drop",
      title: "Experience Levels"
    },
    {
      description: "Learn more about the unique culture and friendships built underwater.",
      icon: "diversity_3",
      title: "The Community"
    }
  ],
  title: "Common Questions"
};
const fallbackContactPage = {
  image: { alt: "Diverse group of divers on a boat", url: contactImage },
  imageText: "Gay and Lesbian Scuba Dive Experts since 1991",
  intro: "Join our global community of LGBTQ+ divers. Whether you're a beginner or a dive master, we have a deck waiting for you.",
  privacyNote: "We respect your privacy - no sharing of your e-mail address with outside parties.",
  title: "Start Your Next Adventure"
};
const fallbackAboutPage = {
  body: renderRichText({
    root: {
      children: [
        {
          children: [{ text: "A Legacy of Connection", type: "text" }],
          tag: "h2",
          type: "heading"
        },
        {
          children: [
            {
              text: "Founded in 1991, Undersea Expeditions was built to create world-class scuba travel in a space that celebrates community, friendship, and the joy of exploring together.",
              type: "text"
            }
          ],
          type: "paragraph"
        },
        {
          children: [
            {
              text: "From first descents to advanced destinations, we design trips for divers who want strong logistics underwater and a welcoming group on deck.",
              type: "text"
            }
          ],
          type: "paragraph"
        }
      ],
      type: "root"
    }
  }),
  pressSection: {
    description: "",
    items: [],
    title: "Press"
  },
  staffSection: {
    description: "",
    officeStaff: [],
    officeTitle: "Office",
    title: "Meet the Team",
    tripLeaders: [],
    tripLeadersTitle: "Trip Leaders"
  },
  title: "Gay and Lesbian Scuba Dive Travel Experts"
};
function resolveMediaUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//.test(url)) return url;
  return `${cmsPublicOrigin}${url.startsWith("/") ? "" : "/"}${url}`;
}
function mapMedia(value, fallback) {
  if (!value || typeof value !== "object") return fallback;
  return {
    alt: value.alt || fallback.alt,
    url: resolveMediaUrl(value.url) || fallback.url
  };
}
function mapOptionalMedia(value) {
  if (!value || typeof value !== "object") return void 0;
  const url = resolveMediaUrl(value.url);
  if (!url) return void 0;
  return {
    alt: value.alt || void 0,
    url
  };
}
function getGroupTypeLabel(gender) {
  switch (gender) {
    case "male":
      return "Male Only Trip";
    case "female":
      return "Female Only Trip";
    case "mixed":
      return "CoEd Trip";
    default:
      return "";
  }
}
function getTripStyleLabel(tripStyle) {
  switch (tripStyle) {
    case "liveaboard":
      return "Liveaboard";
    case "land-resort":
      return "Land Resort";
    default:
      return "";
  }
}
function stripHtml(value) {
  return value ? value.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";
}
function formatTripDateLabel(tripStart, tripEnd, fallback) {
  if (!tripStart || !tripEnd) return fallback || "";
  const start = new Date(tripStart);
  const end = new Date(tripEnd);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return fallback || "";
  }
  const fmt = (value, options) => new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(value);
  const startMonth = fmt(start, { month: "long" });
  const endMonth = fmt(end, { month: "long" });
  const startDay = fmt(start, { day: "numeric" });
  const endDay = fmt(end, { day: "numeric" });
  const startYear = fmt(start, { year: "numeric" });
  const endYear = fmt(end, { year: "numeric" });
  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startDay}-${endDay}, ${startYear}`;
  }
  if (startYear === endYear) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
  }
  return `${fmt(start, { month: "long", day: "numeric", year: "numeric" })} - ${fmt(end, {
    month: "long",
    day: "numeric",
    year: "numeric"
  })}`;
}
function normalizeLegacyUrl(value) {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) {
    try {
      return new URL(trimmed).pathname || "";
    } catch {
      return "";
    }
  }
  if (/^[a-z0-9.-]+\//i.test(trimmed) && !trimmed.startsWith("/")) {
    return `/${trimmed.replace(/^[a-z]+:\/\//i, "")}`;
  }
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}
function inferTripYear(tripYear, tripStart, fallback) {
  if (typeof tripYear === "number" && Number.isFinite(tripYear)) {
    return tripYear;
  }
  if (tripStart) {
    const start = new Date(tripStart);
    if (!Number.isNaN(start.getTime())) {
      return start.getUTCFullYear();
    }
  }
  return fallback || (/* @__PURE__ */ new Date()).getUTCFullYear();
}
function getTripPath(trip) {
  return `/${trip.tripYear}/${trip.slug}`;
}
async function fetchCMS(path) {
  const requestUrl = `${cmsApiUrl}${path}`;
  try {
    const response = await fetch(requestUrl, {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) {
      console.warn(`[content] CMS request failed: ${response.status} ${response.statusText} for ${requestUrl}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn(`[content] CMS request error for ${requestUrl}:`, error);
    return null;
  }
}
function normalizeTrip(doc, fallback) {
  if (!doc?.slug || !doc?.title) return fallback || null;
  const regionLabel = (typeof doc.region === "object" ? doc.region?.name : "") || doc.regionLabel || fallback?.regionLabel || "";
  const countries = doc.countries?.map((item) => typeof item === "object" ? item?.name : "").filter(Boolean) || (fallback?.countries?.length ? fallback.countries : []);
  const stays = doc.stays?.map((item) => typeof item === "object" ? item?.name : "").filter(Boolean) || (fallback?.stays?.length ? fallback.stays : []);
  const tripYear = inferTripYear(doc.tripYear, doc.tripStart, fallback?.tripYear);
  const xPercent = Number(doc.mapPin?.xPercent);
  const yPercent = Number(doc.mapPin?.yPercent);
  const mapPin = doc.mapPin?.showOnHomepage && Number.isFinite(xPercent) && Number.isFinite(yPercent) ? {
    color: doc.mapPin?.color || fallback?.mapPin?.color || "amber",
    showOnHomepage: true,
    xPercent,
    yPercent
  } : fallback?.mapPin?.showOnHomepage ? fallback.mapPin : void 0;
  const path = getTripPath({ slug: doc.slug, tripYear });
  return {
    bannerImage: mapMedia(doc.bannerImage, fallback?.bannerImage || fallback?.coverImage || fallbackTrips[0].coverImage),
    bookingHref: doc.bookingHref || fallback?.bookingHref || "/contact",
    bookingLabel: doc.bookingLabel || fallback?.bookingLabel || "Contact Us",
    coverImage: mapMedia(doc.coverImage, fallback?.coverImage || fallbackTrips[0].coverImage),
    countries,
    dateLabel: formatTripDateLabel(doc.tripStart, doc.tripEnd, doc.dateLabel || fallback?.dateLabel),
    days: doc.days || fallback?.days,
    deposit: renderRichText(doc.contentSections?.deposit) || fallback?.deposit,
    featuredOnHomepage: typeof doc.featuredOnHomepage === "boolean" ? doc.featuredOnHomepage : fallback?.featuredOnHomepage,
    flights: renderRichText(doc.contentSections?.flights) || fallback?.flights,
    gender: doc.gender || fallback?.gender,
    groupTypeLabel: getGroupTypeLabel(doc.gender || fallback?.gender),
    id: doc.id || fallback?.id || doc.slug,
    insuranceImage: doc.insuranceImage?.url ? mapMedia(doc.insuranceImage, fallback?.insuranceImage || fallback?.coverImage || fallbackTrips[0].coverImage) : fallback?.insuranceImage,
    isNew: typeof doc.isNew === "boolean" ? doc.isNew : fallback?.isNew,
    legacyUrl: normalizeLegacyUrl(doc.legacyUrl || fallback?.legacyUrl),
    mapPin,
    nights: doc.nights || fallback?.nights,
    notIncluded: renderRichText(doc.contentSections?.notIncluded) || fallback?.notIncluded,
    overview: renderRichText(doc.contentSections?.overview) || fallback?.overview,
    packageIncludes: renderRichText(doc.contentSections?.packageIncludes) || fallback?.packageIncludes,
    pricingOptions: doc.pricingOptions?.map((item) => ({
      amount: item.amount,
      label: item.label,
      note: renderRichText(item.note)
    })) || fallback?.pricingOptions,
    regionLabel,
    path,
    slug: doc.slug,
    socialEmbeds: doc.socialEmbeds?.map((item) => {
      const platform = item?.platform === "facebook" ? "facebook" : item?.platform === "instagram" ? "instagram" : null;
      const postUrl = typeof item?.postUrl === "string" ? item.postUrl.trim() : "";
      if (!platform || !postUrl) return null;
      return {
        platform,
        postUrl,
        title: item?.title || void 0
      };
    }).filter(Boolean) || fallback?.socialEmbeds,
    stays,
    summary: stripHtml(renderRichText(doc.summary)) || fallback?.summary || "",
    summaryHtml: renderRichText(doc.summary) || fallback?.summaryHtml,
    title: doc.title,
    tripEnd: doc.tripEnd || fallback?.tripEnd,
    tripStart: doc.tripStart || fallback?.tripStart,
    tripYear,
    tripStyle: doc.tripStyle || fallback?.tripStyle,
    tripStyleLabel: getTripStyleLabel(doc.tripStyle || fallback?.tripStyle)
  };
}
function normalizeAboutStaffMember(doc) {
  const name = typeof doc?.name === "string" ? doc.name.trim() : "";
  const role = typeof doc?.role === "string" ? doc.role.trim() : "";
  const bio = renderRichText(doc?.bio) || "";
  const image = mapOptionalMedia(doc?.image);
  if (!name && !role && !bio && !image) return null;
  return {
    bio: bio || void 0,
    image,
    name: name || role || "Team Member",
    role: role || void 0
  };
}
async function getSiteSettings() {
  const global = await fetchCMS("/globals/site-settings?depth=1");
  if (!global) return fallbackSiteSettings;
  return {
    certifications: global.certifications?.map((item) => item.label).filter(Boolean) || fallbackSiteSettings.certifications,
    companyName: global.companyName || fallbackSiteSettings.companyName,
    contact: {
      addressLines: global.contact?.addressLines?.map((item) => item.line).filter(Boolean) || fallbackSiteSettings.contact.addressLines,
      email: global.contact?.email || fallbackSiteSettings.contact.email,
      internationalPhone: global.contact?.internationalPhone || fallbackSiteSettings.contact.internationalPhone,
      tollFreePhone: global.contact?.tollFreePhone || fallbackSiteSettings.contact.tollFreePhone
    },
    footerBlurb: global.footerBlurb || fallbackSiteSettings.footerBlurb,
    insurance: {
      buyButtonHref: global.insurance?.buyButtonHref || fallbackSiteSettings.insurance.buyButtonHref,
      buyButtonLabel: global.insurance?.buyButtonLabel || fallbackSiteSettings.insurance.buyButtonLabel,
      defaultImage: global.insurance?.defaultImage?.url ? mapMedia(global.insurance.defaultImage, fallbackSiteSettings.insurance.defaultImage) : fallbackSiteSettings.insurance.defaultImage,
      logo: global.insurance?.logo?.url ? mapMedia(global.insurance.logo, fallbackSiteSettings.insurance.logo) : fallbackSiteSettings.insurance.logo
    },
    socialLinks: global.socialLinks?.map((item) => ({
      label: item.label,
      url: item.url
    })) || fallbackSiteSettings.socialLinks,
    tagline: global.tagline || fallbackSiteSettings.tagline
  };
}
async function getHomePageContent() {
  const global = await fetchCMS("/globals/home-page?depth=2");
  if (!global) return fallbackHomePage;
  return {
    cta: {
      description: global.cta?.description || fallbackHomePage.cta.description,
      emailLabel: global.cta?.emailLabel || fallbackHomePage.cta.emailLabel,
      phoneLabel: global.cta?.phoneLabel || fallbackHomePage.cta.phoneLabel,
      title: global.cta?.title || fallbackHomePage.cta.title
    },
    featuredTrips: {
      description: global.featuredTrips?.description || fallbackHomePage.featuredTrips.description,
      title: global.featuredTrips?.title || fallbackHomePage.featuredTrips.title
    },
    hero: {
      description: global.hero?.description || fallbackHomePage.hero.description,
      image: mapMedia(global.hero?.image, fallbackHomePage.hero.image),
      logo: global.hero?.logo?.url ? mapMedia(global.hero.logo, { alt: fallbackHomePage.hero.title, url: "" }) : void 0,
      primaryCtaHref: global.hero?.primaryCtaHref || fallbackHomePage.hero.primaryCtaHref,
      primaryCtaLabel: global.hero?.primaryCtaLabel || fallbackHomePage.hero.primaryCtaLabel,
      secondaryCtaHref: global.hero?.secondaryCtaHref || fallbackHomePage.hero.secondaryCtaHref,
      secondaryCtaLabel: global.hero?.secondaryCtaLabel || fallbackHomePage.hero.secondaryCtaLabel,
      title: global.hero?.title || fallbackHomePage.hero.title
    },
    mapSection: {
      buttonHref: global.mapSection?.buttonHref || fallbackHomePage.mapSection.buttonHref,
      buttonLabel: global.mapSection?.buttonLabel || fallbackHomePage.mapSection.buttonLabel,
      description: global.mapSection?.description || fallbackHomePage.mapSection.description,
      title: global.mapSection?.title || fallbackHomePage.mapSection.title
    },
    story: {
      body: global.story?.body?.map((item) => item.paragraph).filter(Boolean) || fallbackHomePage.story.body,
      buttonHref: global.story?.buttonHref || fallbackHomePage.story.buttonHref,
      buttonLabel: global.story?.buttonLabel || fallbackHomePage.story.buttonLabel,
      image: mapMedia(global.story?.image, fallbackHomePage.story.image),
      title: global.story?.title || fallbackHomePage.story.title
    }
  };
}
async function getTripsPageContent() {
  const global = await fetchCMS("/globals/trips-page");
  if (!global) return fallbackTripsPage;
  return {
    description: global.description || fallbackTripsPage.description,
    title: global.title || fallbackTripsPage.title
  };
}
async function getSocialsPageContent() {
  const global = await fetchCMS("/globals/socials-page?depth=2");
  if (!global) return fallbackSocialsPage;
  return {
    description: global.description || fallbackSocialsPage.description,
    latestSocialMoments: {
      description: global.latestSocialMoments?.description || fallbackSocialsPage.latestSocialMoments.description,
      tiles: global.latestSocialMoments?.tiles?.map((item) => {
        const title = typeof item?.title === "string" ? item.title : "";
        const description = typeof item?.description === "string" ? item.description : "";
        const image = mapOptionalMedia(item?.image);
        if (!title && !description && !image && !item?.href) return null;
        return {
          buttonLabel: item?.buttonLabel || void 0,
          description,
          eyebrow: item?.eyebrow || void 0,
          href: item?.href || void 0,
          image,
          title: title || description || "Social Moment"
        };
      }).filter(Boolean) || fallbackSocialsPage.latestSocialMoments.tiles,
      title: global.latestSocialMoments?.title || fallbackSocialsPage.latestSocialMoments.title
    },
    socialLinks: global.socialLinks?.map((item) => {
      const title = typeof item?.title === "string" ? item.title : "";
      const description = typeof item?.description === "string" ? item.description : "";
      if (!title && !description && !item?.href) return null;
      return {
        buttonLabel: item?.buttonLabel || void 0,
        description,
        eyebrow: item?.eyebrow || void 0,
        href: item?.href || void 0,
        title: title || description || "Social Link"
      };
    }).filter(Boolean) || fallbackSocialsPage.socialLinks,
    title: global.title || fallbackSocialsPage.title
  };
}
async function getFAQPageContent() {
  const global = await fetchCMS("/globals/faq-page");
  if (!global) return fallbackFAQPage;
  return {
    description: global.description || fallbackFAQPage.description,
    highlights: global.highlights?.map((item) => ({
      description: item.description,
      icon: item.icon,
      title: item.title
    })) || fallbackFAQPage.highlights,
    title: global.title || fallbackFAQPage.title
  };
}
async function getContactPageContent() {
  const global = await fetchCMS("/globals/contact-page?depth=1");
  if (!global) return fallbackContactPage;
  return {
    image: mapMedia(global.image, fallbackContactPage.image),
    imageText: global.imageText || fallbackContactPage.imageText,
    intro: global.intro || fallbackContactPage.intro,
    privacyNote: global.privacyNote || fallbackContactPage.privacyNote,
    title: global.title || fallbackContactPage.title
  };
}
async function getAboutPageContent() {
  const global = await fetchCMS("/globals/about-page?depth=2");
  if (!global) return fallbackAboutPage;
  return {
    body: renderRichText(global.body) || fallbackAboutPage.body,
    pressSection: {
      description: global.pressSection?.description || fallbackAboutPage.pressSection.description,
      items: global.pressSection?.items?.map((item) => {
        const title = typeof item?.title === "string" ? item.title.trim() : "";
        const description = typeof item?.description === "string" ? item.description.trim() : "";
        const pdf = mapOptionalMedia(item?.pdf);
        const externalUrl = typeof item?.externalUrl === "string" ? item.externalUrl.trim() : "";
        if (!title && !description && !pdf && !externalUrl) return null;
        return {
          ctaLabel: item?.ctaLabel || void 0,
          description: description || void 0,
          externalUrl: externalUrl || void 0,
          pdf,
          title: title || description || "Press Item"
        };
      }).filter(Boolean) || fallbackAboutPage.pressSection.items,
      title: global.pressSection?.title || fallbackAboutPage.pressSection.title
    },
    staffSection: {
      description: global.staffSection?.description || fallbackAboutPage.staffSection.description,
      officeStaff: global.staffSection?.officeStaff?.map((item) => normalizeAboutStaffMember(item)).filter(Boolean) || fallbackAboutPage.staffSection.officeStaff,
      officeTitle: global.staffSection?.officeTitle || fallbackAboutPage.staffSection.officeTitle,
      title: global.staffSection?.title || fallbackAboutPage.staffSection.title,
      tripLeaders: global.staffSection?.tripLeaders?.map((item) => normalizeAboutStaffMember(item)).filter(Boolean) || fallbackAboutPage.staffSection.tripLeaders,
      tripLeadersTitle: global.staffSection?.tripLeadersTitle || fallbackAboutPage.staffSection.tripLeadersTitle
    },
    title: global.title || fallbackAboutPage.title
  };
}
async function getTrips() {
  const response = await fetchCMS("/trips?depth=2&limit=100");
  const docs = response?.docs?.map((doc, index) => normalizeTrip(doc, fallbackTrips[index]))?.filter(Boolean);
  return docs?.length ? docs : fallbackTrips;
}
async function getTripByYearAndSlug(year, slug) {
  const tripYear = Number(year);
  const response = await fetchCMS(
    `/trips?depth=2&limit=10&where[slug][equals]=${encodeURIComponent(slug)}`
  );
  const fallback = fallbackTrips.find((trip) => trip.slug === slug && trip.tripYear === tripYear);
  const normalizedTrips = response?.docs?.map((doc) => normalizeTrip(doc, fallback)).filter((trip) => Boolean(trip)) || [];
  return normalizedTrips.find((trip) => trip.tripYear === tripYear) || normalizedTrips[0] || fallback || null;
}
async function getTripBySlug(slug) {
  const response = await fetchCMS(
    `/trips?depth=2&limit=1&where[slug][equals]=${encodeURIComponent(slug)}`
  );
  return normalizeTrip(response?.docs?.[0], fallbackTrips.find((trip) => trip.slug === slug));
}
async function getFAQs() {
  const response = await fetchCMS("/faqs?limit=100&sort=sortOrder");
  const faqs = response?.docs?.map((doc) => ({
    answer: doc.answer || "",
    category: doc.category || "",
    id: doc.id || doc.question,
    question: doc.question || ""
  })) || [];
  return faqs.length ? faqs : fallbackFaqs;
}

export { getContactPageContent as a, getFAQPageContent as b, getSiteSettings as c, getTrips as d, getFAQs as e, getSocialsPageContent as f, getAboutPageContent as g, getTripBySlug as h, getTripsPageContent as i, getTripByYearAndSlug as j, getHomePageContent as k, logo as l };
