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
    defaultColumns: ["question", "updatedAt"],
    group: "Content",
    useAsTitle: "question",
  },
  orderable: true,
  fields: [
    {
      name: "question",
      type: "text",
      required: true,
    },
    {
      name: "answer",
      type: "textarea",
      required: true,
    },
  ],
};
