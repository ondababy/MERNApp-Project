import { ProductService, UserService } from '#features';
import { Resource } from '#lib';
import { ObjectId } from 'mongodb';

export default class OrderResource extends Resource {
  async transform(order) {
    const { _id, user, products, ...rest } = order;
    const userData = await UserService.getById(user);

    return {
      id: _id,
      ...rest,
      user: userData,
      products,
    };
  }
}
