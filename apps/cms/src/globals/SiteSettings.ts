import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
  },
  admin: {
    group: "Site",
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      required: true,
    },
    {
      name: "tagline",
      type: "textarea",
      required: true,
    },
    {
      name: "footerBlurb",
      type: "textarea",
      required: true,
    },
    {
      name: "contact",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "tollFreePhone",
              type: "text",
              required: true,
            },
            {
              name: "internationalPhone",
              type: "text",
            },
          ],
        },
        {
          name: "email",
          type: "email",
          required: true,
        },
        {
          name: "addressLines",
          type: "array",
          minRows: 1,
          fields: [
            {
              name: "line",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "certifications",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
