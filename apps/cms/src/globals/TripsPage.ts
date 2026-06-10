import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const TripsPage: GlobalConfig = {
  slug: "trips-page",
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
      name: "description",
      type: "textarea",
      required: true,
    },
  ],
};
