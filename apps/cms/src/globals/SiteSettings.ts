import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
    update: isAuthenticated,
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
    {
      name: "insurance",
      label: "Travel Insurance",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "logo",
              label: "Insurance Logo",
              relationTo: "media",
              type: "upload",
            },
            {
              name: "defaultImage",
              label: "Default Panel Image",
              relationTo: "media",
              type: "upload",
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "buyButtonLabel",
              type: "text",
              defaultValue: "Buy Insurance",
              required: true,
            },
            {
              name: "buyButtonHref",
              type: "text",
              defaultValue: "/contact",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
