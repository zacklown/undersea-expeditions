import type { CollectionConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const Regions: CollectionConfig = {
  slug: "regions",
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
        description: "Use lowercase kebab-case. Example: red-sea",
      },
      index: true,
      required: true,
      unique: true,
    },
  ],
};
