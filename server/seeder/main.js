import { brandSeeder } from './brand.seeder.js';
import { cartSeeder } from './cart.seeder.js';
import { categorySeeder } from './category.seeder.js';
import { orderSeeder } from './order.seeder.js';
import { productSeeder } from './product.seeder.js';
import { reviewSeeder } from './review.seeder.js';
import { supplierSeeder } from './supplier.seeder.js';
import { createAdmin, userSeeder } from './user.seeder.js';

// Dependencies for product seeding
const prodDeps = async () =>
  Promise.all([
    brandSeeder(),
    categorySeeder(),
    supplierSeeder(),
  ]);

// Transactions: cart and order seeders
const transaction = async () =>
  Promise.all([
    cartSeeder(20),
    orderSeeder(100),
  ]);

// Main seeding function
const main = async () => {
  console.log('Seeding users...');
  await userSeeder();
  console.log('Users seeded');

  console.log('Seeding product dependencies...');
  await prodDeps();
  console.log('Product dependencies seeded');

  console.log('Seeding products...');
  await productSeeder(50);
  console.log('Products seeded');

  console.log('Seeding transactions...');
  await transaction();
  console.log('Transactions seeded');

  console.log('Seeding reviews...');
  await reviewSeeder(50);
  console.log('Reviews seeded');
};

export const RunSeeders = async () => {
  console.log('Running seeders...');
  await createAdmin(); 
  if (process.env.ENABLE_SEED != 'true' || process.env.NODE_ENV === 'production') {
    console.log('Seeding disabled in production or without ENABLE_SEED flag');
    return;
  }

  console.log('Admin created');
  await main();
  console.log('Seeders completed');
};
