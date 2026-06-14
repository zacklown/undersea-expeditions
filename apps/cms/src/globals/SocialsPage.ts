import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const SocialsPage: GlobalConfig = {
  slug: "socials-page",
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
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "socialLinks",
      label: "Social Links",
      type: "array",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "eyebrow",
              type: "text",
            },
            {
              name: "title",
              type: "text",
            },
          ],
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          type: "row",
          fields: [
            {
              name: "buttonLabel",
              type: "text",
            },
            {
              name: "href",
              label: "Link URL",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "latestSocialMoments",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "tiles",
          type: "array",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                },
                {
                  name: "title",
                  type: "text",
                },
              ],
            },
            {
              name: "description",
              type: "textarea",
            },
            {
              name: "image",
              relationTo: "media",
              type: "upload",
            },
            {
              type: "row",
              fields: [
                {
                  name: "buttonLabel",
                  type: "text",
                },
                {
                  name: "href",
                  label: "Tile Link URL",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
