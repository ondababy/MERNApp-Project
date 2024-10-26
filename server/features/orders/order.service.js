import { CartModel, ProductModel, UserModel } from '#features';
import { ObjectId } from 'mongodb';

import { Service } from '#lib';
import OrderModel from './order.model.js';

class OrderService extends Service {
  model = OrderModel;
  setUserId(userId) {
    this.forceFilter = { user: userId };
  }

  create(data) {
    let { user, products, ...orderData } = data;
    user = new ObjectId(user);
    products = products.map((prev) => ({ ...prev, product: new ObjectId(prev.product) }));

    return this.model.create({ user, products, ...orderData });
  }

  update(data) {}
}

export default new OrderService();
