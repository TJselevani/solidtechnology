import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const brandType = defineType({
  name: "brand",
  title: "Product Brand",
  type: "document",
  icon: TagIcon,
  fields: [
    // Existing fields
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "description",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
});
