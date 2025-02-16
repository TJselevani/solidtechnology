import { defineArrayMember, defineField, defineType } from "sanity";

export const productFeatureType = defineType({
  name: "feature",
  title: "Featured Products",
  type: "document",
  fields: [
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
