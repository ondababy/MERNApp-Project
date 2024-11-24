import { OrderModel, ReviewService, UserModel } from '#features';
import { faker } from '@faker-js/faker';
import { Seeder } from './seeder.js';

class ReviewSeeder extends Seeder {
  constructor(service, count) {
    super(service, count);
    this.user = null;
    this.order = null;    


  }
  async before() {
    this.user = await UserModel.find({});
    this.order = await OrderModel.find({});
  }

  randomUser() {
    let rand = Math.floor(Math.random() * this.user.length);
    let user = this.user[rand];
    this.selectedUser = user;
    return user?._id;
  }


  schema() {
    let user = this.randomUser(this.user);
    let order = this.randomId(this.order);

    return {
      user: () => user,
      order: () => order,
      rating: () => faker.number.int({ min: 1, max: 10 }),
      title: faker.lorem.sentence,
      description: faker.lorem.paragraph,
      isAnonymous: faker.datatype.boolean,  
    };
  }
  async run() {
    await this.before();
    await super.run();
  }
}

export const reviewSeeder = async (count = 10) => {
  const seeder = new ReviewSeeder(ReviewService, count);
  await seeder.run();
};

