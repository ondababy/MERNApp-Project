import { UserModel, UserService } from '#features';
import { faker } from '@faker-js/faker';
<<<<<<< HEAD
import { Seeder } from './seeder.js';
=======
import bcrypt from 'bcryptjs';
import { Seeder } from './seeder';
>>>>>>> main

class UserSeeder extends Seeder {
  constructor(service, count) {
    super(service, count);
  }
  hash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
  custom() {
    return [
      {
        username: process.env.ADMIN_USERNAME,
        email: process.env.ADMIN_EMAIL,
        password: this.hash(process.env.ADMIN_PASSWORD),
      },
    ];
  }
  schema() {
    return {
      username: faker.internet.userName,
      email: faker.internet.email,
      password: () => this.hash(faker.internet.password()),
    };
  }
}

export const userSeeder = async (count = 10) => {
  const seeder = new UserSeeder(UserService, count);
  await seeder.run();
};

