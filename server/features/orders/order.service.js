import { ProductService, UserService } from '#features';

import { Service } from '#lib';
import OrderModel from './order.model.js';

class OrderService extends Service {
  model = OrderModel;
  setUserId(userId) {
    this.forceFilter = { user: userId };
  }

  async create(data, user) {
    let { userId, products, ...orderData } = data;
    const user = await UserService.getById(userId);
    const productData = products.map(async (product) => ({
      product: await ProductService.getById(product.product),
      quantity: product.quantity,
    }));

    return this.model.create({ ...orderData, user, products: productData });
  }

  async update(data) {}
}

export default new OrderService();
