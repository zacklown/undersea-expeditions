import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  admin: {
    group: "Pages",
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          type: "text",
        },
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
        {
          name: "image",
          relationTo: "media",
          required: true,
          type: "upload",
        },
        {
          type: "row",
          fields: [
            {
              name: "primaryCtaLabel",
              type: "text",
              required: true,
            },
            {
              name: "primaryCtaHref",
              type: "text",
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "secondaryCtaLabel",
              type: "text",
              required: true,
            },
            {
              name: "secondaryCtaHref",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "featuredIntro",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "tripsIntro",
      type: "group",
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
    },
    {
      name: "story",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "body",
          type: "array",
          minRows: 1,
          required: true,
          fields: [
            {
              name: "paragraph",
              type: "textarea",
              required: true,
            },
          ],
        },
        {
          name: "image",
          relationTo: "media",
          required: true,
          type: "upload",
        },
        {
          type: "row",
          fields: [
            {
              name: "statOneTitle",
              type: "text",
              required: true,
            },
            {
              name: "statOneBody",
              type: "text",
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "statTwoTitle",
              type: "text",
              required: true,
            },
            {
              name: "statTwoBody",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "cta",
      type: "group",
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
        {
          type: "row",
          fields: [
            {
              name: "phoneLabel",
              type: "text",
              required: true,
            },
            {
              name: "emailLabel",
              type: "text",
              required: true,
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "newsletterPlaceholder",
              type: "text",
              required: true,
            },
            {
              name: "newsletterButtonLabel",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "newsletterHelperText",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
