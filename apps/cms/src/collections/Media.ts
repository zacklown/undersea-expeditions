import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
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
