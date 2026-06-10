import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
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
      name: "intro",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      relationTo: "media",
      required: true,
      type: "upload",
    },
    {
      name: "imageText",
      type: "text",
      required: true,
    },
    {
      name: "privacyNote",
      type: "textarea",
      required: true,
    },
  ],
};
