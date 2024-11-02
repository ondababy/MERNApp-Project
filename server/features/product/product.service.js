import { Service } from '#lib';
import ProductModel from './product.model.js';

class ProductService extends Service {
  model = ProductModel;
  fieldToSlugify = 'name';

  async getBySlug(slug) {
    this._checkModel();
    return this.model.findOne({ slug });
  }
}

export default new ProductService();






// // export default new ProductService();
// import { BrandModel, SupplierModel } from '#features';
// import { Service } from '#lib';
// import ProductModel from './product.model.js';

// class ProductService extends Service {
//   model = ProductModel;

//   async create(data) {
//     const { name, price, quantity, brandId, supplierId } = data;

//     const brand = await this.validateBrand(brandId);
//     const supplier = await this.validateSupplier(supplierId);

//     const newProduct = await this.model.create({ // Use this.model instead
//       name,
//       price,
//       quantity,
//       brand: brand._id,
//       supplier: supplier._id
//     });

//     return newProduct;
//   }

//   async validateBrand(brandId) {
//     const brand = await BrandModel.findById(brandId);
//     if (!brand) throw new Error('Brand not found');
//     return brand;
//   }

//   async validateSupplier(supplierId) {
//     const supplier = await SupplierModel.findById(supplierId);
//     if (!supplier) throw new Error('Supplier not found');
//     return supplier;
//   }
// }

// export default new ProductService();
