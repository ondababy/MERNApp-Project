import { ProductService } from '#features';
import { faker } from '@faker-js/faker';
import { Seeder } from './seeder.js';

class ProductSeeder extends Seeder {
  schema() {
    return {
      name: () =>
        // filter so that it is .matches(/^[a-zA-Z0-9 ]+$/) alphanumeric
        faker.commerce.product() +
        ' Product Code: ' +
        faker.string.alpha({ length: 6, casing: 'upper', exclude: ['A'] }),
      description: faker.commerce.productDescription,
      price: () => faker.commerce.price({ min: 1000 }),
      stock: () => faker.number.int({ min: 64, max: 100 }),
    };
  }
}

export const productSeeder = async (count = 10) => {
  const seeder = new ProductSeeder(ProductService, count);
  await seeder.run();
};

