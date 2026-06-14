import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

const staffFields = [
  {
    type: "row" as const,
    fields: [
      {
        name: "name",
        type: "text" as const,
      },
      {
        name: "role",
        type: "text" as const,
      },
    ],
  },
  {
    name: "image",
    relationTo: "media" as const,
    type: "upload" as const,
  },
  {
    name: "bio",
    type: "richText" as const,
  },
];

export const AboutPage: GlobalConfig = {
  slug: "about-page",
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
      name: "body",
      label: "Page Text",
      type: "richText",
    },
    {
      name: "staffSection",
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
          name: "officeTitle",
          label: "Office Section Title",
          type: "text",
        },
        {
          name: "officeStaff",
          label: "Office Staff",
          type: "array",
          fields: staffFields,
        },
        {
          name: "tripLeadersTitle",
          label: "Trip Leaders Section Title",
          type: "text",
        },
        {
          name: "tripLeaders",
          type: "array",
          fields: staffFields,
        },
      ],
    },
    {
      name: "pressSection",
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
          name: "items",
          type: "array",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "title",
                  type: "text",
                },
                {
                  name: "ctaLabel",
                  type: "text",
                },
              ],
            },
            {
              name: "description",
              type: "textarea",
            },
            {
              name: "pdf",
              label: "PDF File",
              relationTo: "media",
              type: "upload",
            },
            {
              name: "externalUrl",
              label: "External URL",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
