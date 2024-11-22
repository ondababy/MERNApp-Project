// import { Resource } from '#lib';
// export default class ProductResource extends Resource {
//   transform(product) {
//     const { _id, ...rest } = product;
//     return {
//       id: _id,
//       ...rest,
//     };
//   }
// }

import { BrandModel, CategoryModel, SupplierModel } from '#features';
import { Resource } from '#lib';

export default class ProductResource extends Resource {
  async transform(product) {
    if (!product?._id) return null;
    const { _id, category, brand, supplier, ...rest } = product;

    const categoryDetails = await CategoryModel.findById(category).select('name _id');
    const brandDetails = await BrandModel.findById(brand).select('name _id');
    const supplierDetails = await SupplierModel.findById(supplier).select('name _id');

    return {
      id: _id,
      category: categoryDetails ? { id: categoryDetails._id, name: categoryDetails.name } : null,
      brand: brandDetails ? { id: brandDetails._id, name: brandDetails.name } : null,
      supplier: supplierDetails ? { id: supplierDetails._id, name: supplierDetails.name } : null,
      ...rest,
    };
  }
}
