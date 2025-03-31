import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { orderType } from "./orderType";
import { saleType } from "./saleType";
import { manufacturerType } from "./manufacturerType";
import { formFactorType } from "./formFactorType";
import { productPartType } from "./productPartType";
import { productAdvertType } from "./productAdvertType";
import { productFeatureType } from "./ProductFeatureType";
import { accessoryType } from "./accessoryType";
import { brandType } from "./brandType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    productType,
    orderType,
    saleType,
    manufacturerType,
    formFactorType,
    productPartType,
    productAdvertType,
    productFeatureType,
    accessoryType,
    brandType
  ],
};
