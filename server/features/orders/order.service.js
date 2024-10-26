import { ProductModel, ProductService, UserService } from '#features';

import { Service } from '#lib';
import OrderModel from './order.model.js';

class OrderService extends Service {
  model = OrderModel;
  setUserId(userId) {
    this.forceFilter = { user: userId };
  }

  async manageStock(products) {
    // Manage Stock
    const productList = products.map((product) => product.product);
    const productData = await ProductService.find({ _id: { $in: productList } });
    await productList.forEach(async (product, index) => {
      if (productData[index].stock < products[index].quantity) {
        throw new Error('Product out of stock');
      }
      productData[index].stock -= products[index].quantity;
      await productData[index].save();
    });
  }

  async create(data) {
    let { userId, products, ...orderData } = data;
    const user = await UserService.getById(userId);

    return this.model.create({
      ...orderData,
      user,
      products,
    });
  }

  async update(data) {}
}

export default new OrderService();
