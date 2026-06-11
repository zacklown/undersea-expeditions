import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

const mapPinColorOptions = [
  { label: "Amber", value: "amber" },
  { label: "Apricot", value: "apricot" },
  { label: "Aqua", value: "aqua" },
  { label: "Berry", value: "berry" },
  { label: "Blush", value: "blush" },
  { label: "Brick", value: "brick" },
  { label: "Bronze", value: "bronze" },
  { label: "Coral", value: "coral" },
  { label: "Crimson", value: "crimson" },
  { label: "Deep Blue", value: "deep-blue" },
  { label: "Emerald", value: "emerald" },
  { label: "Forest", value: "forest" },
  { label: "Gold", value: "gold" },
  { label: "Hot Pink", value: "hot-pink" },
  { label: "Indigo", value: "indigo" },
  { label: "Lavender", value: "lavender" },
  { label: "Lemon", value: "lemon" },
  { label: "Mint", value: "mint" },
  { label: "Ocean", value: "ocean" },
  { label: "Orchid", value: "orchid" },
  { label: "Peacock", value: "peacock" },
  { label: "Plum", value: "plum" },
  { label: "Seafoam", value: "seafoam" },
  { label: "Terracotta", value: "terracotta" },
];

export const Trips: CollectionConfig = {
  slug: "trips",
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
  },
  admin: {
    defaultColumns: ["title", "tripStart", "featuredOnHomepage", "tripStyle", "gender", "isNew", "updatedAt"],
    group: "Content",
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        description: "Use lowercase kebab-case. Example: magic-of-the-maldives",
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: "legacyUrl",
      label: "Legacy URL",
      type: "text",
      admin: {
        description:
          "Optional old UnderseaX URL to redirect, such as /gay-scuba-trips/havana.html or the full old URL.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "region",
          label: "Region",
          relationTo: "regions",
          required: true,
          type: "relationship",
        },
        {
          name: "countries",
          label: "Countries",
          hasMany: true,
          relationTo: "countries",
          required: true,
          type: "relationship",
        },
        {
          name: "stays",
          label: "Stay",
          hasMany: true,
          relationTo: "stays",
          required: true,
          type: "relationship",
        },
      ],
    },
    {
      name: "mapPin",
      label: "Homepage Map Pin",
      type: "group",
      admin: {
        description: "Place a clickable destination pin on the homepage map for this trip.",
      },
      fields: [
        {
          name: "picker",
          type: "ui",
          admin: {
            components: {
              Field: {
                path: "./src/components/TripMapPicker#TripMapPickerField",
                clientProps: {
                  colorPath: "mapPin.color",
                  showOnHomepagePath: "mapPin.showOnHomepage",
                  imageSrc: "/MapChart_Map.png",
                  xPath: "mapPin.xPercent",
                  yPath: "mapPin.yPercent",
                },
              },
            },
          },
        },
        {
          type: "row",
          fields: [
            {
              name: "showOnHomepage",
              label: "Show Pin On Homepage",
              type: "checkbox",
              defaultValue: false,
            },
            {
              name: "xPercent",
              label: "Pin X Position (%)",
              type: "number",
              admin: {
                description: "0 is the far left of the map and 100 is the far right.",
                step: 0.1,
              },
              max: 100,
              min: 0,
            },
            {
              name: "yPercent",
              label: "Pin Y Position (%)",
              type: "number",
              admin: {
                description: "0 is the top of the map and 100 is the bottom.",
                step: 0.1,
              },
              max: 100,
              min: 0,
            },
            {
              name: "color",
              label: "Pin Color",
              type: "select",
              defaultValue: "amber",
              options: mapPinColorOptions,
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "tripStyle",
          label: "Trip Type",
          defaultValue: "land-resort",
          required: true,
          type: "select",
          options: [
            { label: "Liveaboard", value: "liveaboard" },
            { label: "Land Resort", value: "land-resort" },
          ],
        },
        {
          name: "gender",
          defaultValue: "mixed",
          required: true,
          type: "select",
          options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Mixed", value: "mixed" },
          ],
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "tripYear",
          label: "Trip Year",
          type: "number",
          admin: {
            description: "Used in the trip URL, for example /2027/maldives.",
          },
          min: 2024,
        },
        {
          name: "tripStart",
          required: true,
          type: "date",
        },
        {
          name: "tripEnd",
          required: true,
          type: "date",
        },
        {
          name: "isNew",
          defaultValue: false,
          type: "checkbox",
        },
        {
          name: "featuredOnHomepage",
          label: "Feature On Homepage",
          admin: {
            description: "Include this trip in the homepage Featured Trips carousel.",
          },
          defaultValue: false,
          type: "checkbox",
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "days",
          min: 1,
          required: true,
          type: "number",
        },
        {
          name: "nights",
          min: 0,
          required: true,
          type: "number",
        },
      ],
    },
    {
      name: "summary",
      label: "Trip Summary",
      admin: {
        description: "Short formatted intro shown near the top of the trip page.",
      },
      required: true,
      type: "richText",
    },
    {
      name: "contentSections",
      type: "group",
      fields: [
        {
          name: "overview",
          label: "Trip Description",
          admin: {
            description: "Main formatted description for the trip detail page.",
          },
          type: "richText",
        },
        {
          name: "packageIncludes",
          label: "Package Includes",
          admin: {
            description: "Formatted package inclusions shown on the trip detail page.",
          },
          type: "richText",
        },
        {
          name: "notIncluded",
          label: "Not Included",
          admin: {
            description: "Formatted exclusions shown on the trip detail page.",
          },
          type: "richText",
        },
        {
          name: "flights",
          type: "richText",
        },
        {
          name: "deposit",
          type: "richText",
        },
      ],
    },
    {
      name: "pricingOptions",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              required: true,
              type: "text",
            },
            {
              name: "amount",
              required: true,
              type: "number",
            },
          ],
        },
        {
          name: "note",
          type: "richText",
        },
      ],
    },
    {
      name: "coverImage",
      relationTo: "media",
      required: true,
      type: "upload",
    },
    {
      name: "gallery",
      label: "Featured Gallery",
      relationTo: "galleries",
      type: "relationship",
      admin: {
        description: "Optional gallery preview shown near the top of the trip page.",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "bookingLabel",
          type: "text",
          defaultValue: "Contact Us",
          required: true,
        },
        {
          name: "bookingHref",
          type: "text",
          defaultValue: "/contact",
          required: true,
        },
      ],
    },
  ],
};
