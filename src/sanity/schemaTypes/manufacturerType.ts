import { defineField, defineType } from "sanity";
import { PresentationIcon } from "@sanity/icons";

export const manufacturerType = defineType({
  name: "manufacturer",
  title: "Manufacturers",
  type: "document",
  icon: PresentationIcon,
  fields: [
    defineField({
      name: "name",
      title: "Manufacturer Name",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: "country",
      title: "Country of Origin",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Manufacturer Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
});
