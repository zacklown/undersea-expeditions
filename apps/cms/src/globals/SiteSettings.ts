import type { GlobalConfig } from "payload";
import { isAuthenticated } from "../access/isAuthenticated";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
    update: isAuthenticated,
  },
  admin: {
    group: "Site",
  },
  fields: [
    {
      name: "companyName",
      type: "text",
      required: true,
    },
    {
      name: "tagline",
      type: "textarea",
      required: true,
    },
    {
      name: "footerBlurb",
      type: "textarea",
      required: true,
    },
    {
      name: "contact",
      type: "group",
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "tollFreePhone",
              type: "text",
              required: true,
            },
            {
              name: "internationalPhone",
              type: "text",
            },
          ],
        },
        {
          name: "email",
          type: "email",
          required: true,
        },
        {
          name: "addressLines",
          type: "array",
          minRows: 1,
          fields: [
            {
              name: "line",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "certifications",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "socialLinks",
      label: "Social Channels",
      type: "array",
      admin: {
        description: "Footer social icons. Choose a platform and add its public profile URL.",
      },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "platform",
              type: "select",
              defaultValue: "website",
              options: [
                { label: "Instagram", value: "instagram" },
                { label: "Facebook", value: "facebook" },
                { label: "TikTok", value: "tiktok" },
                { label: "YouTube", value: "youtube" },
                { label: "X", value: "x" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "Website", value: "website" },
              ],
              required: true,
            },
            {
              name: "label",
              type: "text",
              admin: {
                description: "Accessible label, such as Undersea Expeditions on Instagram.",
              },
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "insurance",
      label: "Travel Insurance",
      type: "group",
      fields: [
        {
          name: "danImage",
          label: "DAN Insurance Image",
          relationTo: "media",
          type: "upload",
        },
        {
          name: "defaultImage",
          label: "Default Trip Insurance Image",
          relationTo: "media",
          type: "upload",
          admin: {
            description: "Used on trip pages when that trip does not provide its own insurance image.",
          },
        },
        {
          name: "description",
          label: "Insurance Blurb",
          type: "textarea",
        },
        {
          type: "row",
          fields: [
            {
              name: "danLabel",
              label: "DAN Link Label",
              type: "text",
              defaultValue: "DAN Insurance",
            },
            {
              name: "danHref",
              label: "DAN Insurance URL",
              type: "text",
              admin: {
                description: "Use the complete external URL, including https://.",
              },
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "travelLabel",
              label: "Travel Insurance Link Label",
              type: "text",
              defaultValue: "Travel Insurance",
            },
            {
              name: "travelHref",
              label: "Travel Insurance URL",
              type: "text",
              admin: {
                description: "Use the complete external URL, including https://.",
              },
            },
          ],
        },
      ],
    },
    {
      name: "legalPages",
      label: "Legal Pages",
      type: "group",
      admin: {
        description: "Content is intentionally blank until reviewed and supplied by your legal advisor.",
      },
      fields: [
        {
          name: "privacyPolicy",
          label: "Privacy Policy",
          type: "richText",
        },
        {
          name: "cookiePolicy",
          label: "Cookie Policy",
          type: "richText",
        },
        {
          name: "termsAndConditions",
          label: "Terms & Conditions",
          type: "richText",
        },
        {
          name: "accessibilityStatement",
          label: "Accessibility Statement",
          type: "richText",
        },
      ],
    },
  ],
};
