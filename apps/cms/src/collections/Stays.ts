import type { CollectionConfig } from "payload";

export const Stays: CollectionConfig = {
  slug: "stays",
  access: {
    read: () => true,
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
        description: "Use lowercase kebab-case. Example: buddy-dive-resort",
      },
      index: true,
      required: true,
      unique: true,
    },
  ],
};
