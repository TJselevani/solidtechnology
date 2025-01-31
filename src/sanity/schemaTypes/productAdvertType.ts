import { defineArrayMember, defineField, defineType } from "sanity";

export const productAdvertType = defineType({
  name: "advertisement",
  title: "Advertisement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
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
      name: "duration",
      title: "Transition Duration (seconds)",
      type: "number",
      description: "Duration for each product to be displayed.",
      validation: (Rule) => Rule.min(1).max(60).required(),
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "product",
              title: "Product",
              type: "reference",
              to: [{ type: "product" }],
            }),
          ],
          preview: {
            select: {
              product: "product.name",
              image: "product.image",
              price: "product.price",
              currency: "product.currency",
            },
            prepare(select) {
              return {
                title: `${select.product}`,
                subtitle: `${select.price}`,
                media: select.image,
              };
            },
          },
        }),
      ],
    }),
  ],
});
