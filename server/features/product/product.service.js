import { BrandModel, CategoryModel, SupplierModel } from '#features';
import { Service } from '#lib';
import ProductModel from './product.model.js';

class ProductService extends Service {
  model = ProductModel;
  fieldToSlugify = 'name';

  async getCategoryId(name) {
    const category = await CategoryModel.findOne({ name });
    if (!category) throw new Error('Category not found');
    return category._id;
  }


  async getBrandId(name) {
    const brand = await BrandModel.findOne({ name });
    if (!brand) throw new Error('Brand not found');
    return brand._id;
  }

  async getSupplierId(name) {
    const supplier = await SupplierModel.findOne({ name });
    if (!supplier) throw new Error('Supplier not found');
    return supplier._id;
  }

  async getBySlug(slug) {
    this._checkModel();
    return this.model.findOne({ slug });
  }
}

export default new ProductService();
