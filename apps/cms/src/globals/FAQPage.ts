import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const FAQPage: GlobalConfig = {
  slug: "faq-page",
  access: {
    read: () => true,
    update: isAuthenticated,
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
