import type { GlobalConfig } from "payload";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
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
