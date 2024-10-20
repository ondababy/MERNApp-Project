import { cartSeeder } from './cart.seeder.js';
import { productSeeder } from './product.seeder.js';
import { userSeeder } from './user.seeder.js';

export const RunSeeders = async () => {
  await userSeeder(3);
  await cartSeeder(6);
  // await productSeeder(20);
};

