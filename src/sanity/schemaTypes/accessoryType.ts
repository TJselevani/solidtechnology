import { BoltIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const accessoryType = defineType({
  name: "accessory",
  title: "Accessories",
  type: "document",
  icon: BoltIcon,
  fields: [
    defineField({
      name: "name",
      title: "Accessory Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Accessory Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "brand",
      title: "Product Brand",
      type: "reference",
      to: [{ type: "brand" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Accessory Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "key",
              type: "string",
              title: "Specification",
            }),
            defineField({
              name: "value",
              type: "string",
              title: "Value",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "compatibility",
      type: "array",
      title: "Compatibility",
      of: [{ type: "string" }],
      description: "List compatible components or systems",
    }),
    defineField({
      name: "powerConsumption",
      type: "string",
      title: "Power Consumption",
      description: "Specify power requirements (if applicable)",
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.required(),
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
