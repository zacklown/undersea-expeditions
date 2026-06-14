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
      label: "Other Social Posts",
      type: "group",
      fields: [
        {
          name: "title",
          admin: {
            condition: () => false,
          },
          type: "text",
        },
        {
          name: "description",
          admin: {
            condition: () => false,
          },
          type: "textarea",
        },
        {
          name: "tiles",
          label: "Posts",
          type: "array",
          fields: [
            {
              type: "row",
              admin: {
                condition: () => false,
              },
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
              admin: {
                condition: () => false,
              },
              type: "textarea",
            },
            {
              admin: {
                condition: () => false,
              },
              name: "image",
              relationTo: "media",
              type: "upload",
            },
            {
              type: "row",
              fields: [
                {
                  name: "buttonLabel",
                  admin: {
                    condition: () => false,
                  },
                  type: "text",
                },
                {
                  name: "href",
                  admin: {
                    description: "Use an Instagram or Facebook post URL to render the embed.",
                  },
                  label: "Post URL",
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
