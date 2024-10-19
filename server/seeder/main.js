import { productSeeder } from './product.seeder';

export const RunSeeders = async () => {
  await productSeeder(20);
};

