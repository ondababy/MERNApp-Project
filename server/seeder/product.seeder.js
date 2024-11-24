import { BrandModel, CategoryModel, ProductService, SupplierModel } from '#features';
import { faker } from '@faker-js/faker';
import { Seeder } from './seeder.js';

class ProductSeeder extends Seeder {
  constructor(service, count) {
    super(service, count);
    this.brand = null;
    this.supplier = null;
    this.category = null;
  }

  async before() {
    this.brand = await BrandModel.find({});
    this.supplier = await SupplierModel.find({});
    this.category = await CategoryModel.find({});
  }
  schema() {
    return {
      name: () =>
        faker.commerce.product() +
        ' ' +
        faker.string.alpha({ length: 6, casing: 'upper', exclude: ['A'] }),
      description: faker.commerce.productDescription,
      price: () => faker.commerce.price({ min: 1000, max: 50000 }),
      stock: () => faker.number.int({ min: 64, max: 100 }),
      brand: () => {
        let randB = Math.floor(Math.random() * this.brand.length);
        let brand = this.brand[randB];
        return brand?._id;
      },
      supplier: () => {
        let randS = Math.floor(Math.random() * this.supplier.length);
        let supplier = this.supplier[randS];
        return supplier?._id;
      },
      category: () => {
        let randC = Math.floor(Math.random() * this.category.length);
        let category = this.category[randC];
        return category?._id;
      },
      averageRating: () => faker.number.float({ min: 1, max: 10, fixed: 1 }),
    };
  }

  async run() {
    await this.before();
    await super.run();
  }


}

export const productSeeder = async (count = 10) => {
  const seeder = new ProductSeeder(ProductService, count);
  await seeder.run();
};

