import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const FAQs: CollectionConfig = {
  slug: "faqs",
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
  },
  admin: {
    defaultColumns: ["question", "category", "updatedAt"],
    group: "Content",
    useAsTitle: "question",
  },
  defaultSort: "sortOrder",
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "text",
        },
        {
          name: "sortOrder",
          type: "number",
          defaultValue: 10,
        },
      ],
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
    },
  ],
};
