import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const Galleries: CollectionConfig = {
  slug: "galleries",
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    group: "Content",
    useAsTitle: "title",
  },
  defaultSort: "sortOrder",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      admin: {
        description: "Use lowercase kebab-case. Example: maldives-liveaboard",
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "overlayText",
          type: "text",
          required: true,
        },
        {
          name: "sortOrder",
          type: "number",
          defaultValue: 10,
        },
      ],
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "coverImage",
      relationTo: "media",
      required: true,
      type: "upload",
    },
    {
      name: "images",
      type: "array",
      minRows: 1,
      required: true,
      fields: [
        {
          name: "image",
          relationTo: "media",
          required: true,
          type: "upload",
        },
        {
          name: "caption",
          type: "text",
        },
      ],
    },
  ],
};
