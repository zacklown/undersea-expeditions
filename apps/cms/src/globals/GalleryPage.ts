import type { GlobalConfig } from "payload";

export const GalleryPage: GlobalConfig = {
  slug: "gallery-page",
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
  ],
};
