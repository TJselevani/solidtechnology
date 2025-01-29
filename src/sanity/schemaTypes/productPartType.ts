import { defineField, defineType } from "sanity";

export const productPartType = defineType({
  name: "productPart",
  title: "Product Part",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Part Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Part Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Part Description",
      type: "text",
    }),
    defineField({
      name: "price",
      title: "Part Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "stock",
      title: "Stock Quantity",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productReference",
      title: "Product Reference",
      type: "reference",
      to: [{ type: "product" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Part Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
              description: "Add a caption for this image (optional).",
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      subtitle: "price",
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
