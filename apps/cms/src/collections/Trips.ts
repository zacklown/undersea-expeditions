import type { CollectionConfig } from "payload";

export const Trips: CollectionConfig = {
  slug: "trips",
  access: {
    read: () => true,
  },
  admin: {
    defaultColumns: ["title", "tripStart", "tripStyle", "gender", "isNew", "updatedAt"],
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
          type: "array",
          fields: [
            {
              name: "item",
              required: true,
              type: "text",
            },
          ],
        },
        {
          name: "notIncluded",
          type: "array",
          fields: [
            {
              name: "item",
              required: true,
              type: "text",
            },
          ],
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
