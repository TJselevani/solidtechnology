import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Product Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      type: "reference",
      title: "Product Type",
      to: [{ type: "formFactor" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "manufacturer",
      title: "Manufacturer",
      type: "reference",
      to: { type: "manufacturer" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "description",
      title: "Product Description",
      type: "blockContent",
    }),
    defineField({
      name: "ramCapacity",
      type: "string",
      title: "RAM Capacity",
      description: "Specify the RAM capacity in GB (e.g., 4GB, 8GB, 16GB)",
      options: {
        list: [
          { title: "4GB", value: "4" },
          { title: "8GB", value: "8" },
          { title: "12GB", value: "12" },
          { title: "16GB", value: "16" },
          { title: "32GB", value: "32" },
        ],
      },
    }),
    defineField({
      name: "storage",
      type: "string",
      title: "Storage Capacity",
      description: "Specify the Storage capacity in GB (e.g., 500GB, 1TB, 2TB)",
      options: {
        list: [
          { title: "128GB", value: "128" },
          { title: "256GB", value: "256" },
          { title: "512GB", value: "512" },
          { title: "1TB", value: "1024" },
          { title: "2TB", value: "2048" },
        ],
      },
    }),
    defineField({
      name: "cpuGeneration",
      type: "string",
      title: "CPU Generation",
      description: "Specify the CPU generation (e.g., 10th, 11th, 12th)",
      options: {
        list: [
          { title: "3rd Gen", value: "3" },
          { title: "4th Gen", value: "4" },
          { title: "5th Gen", value: "5" },
          { title: "6th Gen", value: "6" },
          { title: "7th Gen", value: "7" },
          { title: "8th Gen", value: "8" },
          { title: "10th Gen", value: "10" },
          { title: "11th Gen", value: "11" },
          { title: "12th Gen", value: "12" },
          { title: "13th Gen", value: "13" },
        ],
      },
    }),
    defineField({
      name: "cpuType",
      type: "string",
      title: "CPU Type",
      description:
        "Specify the type of CPU (e.g., Core i3, Core i5, Core i7, Core i9)",
      options: {
        list: [
          { title: "Pentium", value: "Pentium" },
          { title: "Celeron", value: "celeron" },
          { title: "Core i3", value: "core i3" },
          { title: "Core i5", value: "core i5" },
          { title: "Core i7", value: "core i7" },
          { title: "Core i9", value: "core i9" },
        ],
      },
    }),
    defineField({
      name: "screenSize",
      type: "string",
      title: "Screen Size",
      description: "Specify the screen size (e.g., 13.3 inches, 15.6 inches)",
    }),
    defineField({
      name: "weight",
      type: "string",
      title: "Weight",
      description: "Specify the weight of the laptop (e.g., 1.2kg, 2.5kg)",
    }),
    defineField({
      name: "batteryLife",
      type: "string",
      title: "Battery Life",
      description:
        "Specify the battery life in hours (e.g., 8 hours, 12 hours)",
    }),
    defineField({
      name: "operatingSystem",
      type: "string",
      title: "Operating System",
      description:
        "Specify the operating system (e.g., Windows 10, macOS, Linux)",
    }),

    defineField({
      name: "price",
      type: "number",
      title: "Price",
      description: "Specify the price of the laptop",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "categories",
      title: "categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      title: "stock",
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
