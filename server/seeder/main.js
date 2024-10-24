import { cartSeeder } from './cart.seeder';
import { productSeeder } from './product.seeder';
import { userSeeder } from './user.seeder';

export const RunSeeders = async () => {
<<<<<<< HEAD
  await userSeeder(3);
  await cartSeeder(6);
  await productSeeder(20);
=======
  await productSeeder(50);
  await userSeeder(10);
  await cartSeeder(20);
>>>>>>> 0a2d2f128af238db41dd5c3d42da424613aabb15
};

