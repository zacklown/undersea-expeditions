import type { GlobalConfig } from "payload";

export const FAQPage: GlobalConfig = {
  slug: "faq-page",
  access: {
    read: () => true,
  },
  admin: {
    group: "Pages",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "highlights",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "icon",
              type: "text",
              required: true,
            },
            {
              name: "title",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
