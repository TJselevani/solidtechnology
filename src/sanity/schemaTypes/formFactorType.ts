import { defineType, defineField } from "sanity";
import { AddCircleIcon } from "@sanity/icons";

export const formFactorType = defineType({
  name: "formFactor",
  title: "Form Factor",
  type: "document",
  icon: AddCircleIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "A brief description of the form factor.",
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "image",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `$${select.subtitle}`,
        media: select.media,
      };
    },
  },
});
