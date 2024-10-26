import { cartSeeder } from './cart.seeder.js';
import { productSeeder } from './product.seeder.js';
import { userSeeder } from './user.seeder.js';

export const RunSeeders = async () => {
<<<<<<< HEAD
  await userSeeder(10);
  await cartSeeder(10);
  await productSeeder(50);
=======
  await productSeeder(50);
  await userSeeder(10);
  await cartSeeder(20);
>>>>>>> main
};
