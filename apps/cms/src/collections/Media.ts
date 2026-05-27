import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  admin: {
    group: "Content",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    adminThumbnail: "card",
    focalPoint: true,
    imageSizes: [
      {
        name: "card",
        height: 720,
        width: 1280,
      },
    ],
    mimeTypes: ["image/*"],
    staticDir: "media",
  },
};
