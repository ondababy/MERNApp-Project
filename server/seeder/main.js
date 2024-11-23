import { cartSeeder } from './cart.seeder.js';
import { productSeeder } from './product.seeder.js';
import { createAdmin, userSeeder } from './user.seeder.js';

export const RunSeeders = async () => {
  await createAdmin();
  if (process.env.ENABLE_SEED != 'true' || process.env.NODE_ENV === 'production') return;
  console.log('Running seeders');  
  await productSeeder(50);
  await userSeeder(5);
  await cartSeeder(20);
};

