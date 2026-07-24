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
          name: "title",
          label: "Fallback Title",
          type: "text",
          admin: {
            description: "Shown only if no logo overlay image is uploaded.",
          },
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "logo",
          label: "Hero Logo Overlay",
          relationTo: "media",
          type: "upload",
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
            },
            {
              name: "secondaryCtaHref",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "featuredTrips",
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
        },
      ],
    },
    {
      name: "mapSection",
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
        },
        {
          type: "row",
          fields: [
            {
              name: "buttonLabel",
              type: "text",
              required: true,
            },
            {
              name: "buttonHref",
              type: "text",
              required: true,
            },
          ],
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
              name: "buttonLabel",
              type: "text",
            },
            {
              name: "buttonHref",
              type: "text",
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
      ],
    },
  ],
};
