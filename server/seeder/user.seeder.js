import { UserModel, UserService } from '#features';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import { Seeder } from './seeder.js';

export const createAdmin = async () => {
  const admin = await UserModel.findOne({ username: process.env.ADMIN_USERNAME });
  if (!admin) {
    console.log('Creating admin for the first time.');
    const user = await UserService.create({
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
      emailVerifiedAt: new Date(),
      
    });
    if (!user) return console.log('Admin user not created');
    console.log('Admin user created: ', user);
  }

}

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
        role: 'admin',
        emailVerifiedAt: new Date(),
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

