import { defineField, defineType } from "sanity";

export const productAdvertType = defineType({
  name: "advertisement",
  title: "Product Advert",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Banner Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: { type: "product" } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "duration",
      title: "Transition Duration (seconds)",
      type: "number",
      description: "Duration for each product to be displayed.",
      validation: (Rule) => Rule.min(1).max(60).required(),
    }),
  ],
});
