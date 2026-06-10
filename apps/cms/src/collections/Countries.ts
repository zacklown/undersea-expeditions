import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const Countries: CollectionConfig = {
  slug: "countries",
  access: {
    create: isAuthenticated,
    delete: isAuthenticated,
    read: () => true,
    update: isAuthenticated,
  },
  admin: {
    defaultColumns: ["name", "slug", "updatedAt"],
    group: "Content",
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
    },
    {
      name: "slug",
      type: "text",
      admin: {
        description: "Use lowercase kebab-case. Example: indonesia",
      },
      index: true,
      required: true,
      unique: true,
    },
  ],
};
