import { ProductModel, ProductService, UserService } from '#features';

import { Service } from '#lib';
import exp from 'constants';
import OrderModel from './order.model.js';

class OrderService extends Service {
  model = OrderModel;
  setUserId(userId) {
    this.forceFilter = { user: userId };
  }
  shippingMethods = {
    std: { key: 'std', fee: 100, method: 'Standard', day: 7},
    exp: { key: 'exp', fee: 200, method: 'Express', day: 3},
    smd: { key: 'smd', fee: 300, method: 'Same Day', day: 1},
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
    let { userId, products, shipping, ...orderData } = data;
    const user = await UserService.getById(userId);

    return this.model.create({
      ...orderData,
      user,
      products,
      shipping: {
        ...shipping,
        expected_ship_date: new Date(Date.now() + this.shippingMethods[shipping.method].day * 24 * 60 * 60 * 1000),
      },
    });
  }

  async update(data) {
    let { id, products, shipping, ...orderData } = data;
    const order = await this.getById(id);
    const user = await UserService.getById(order.user);

    return order.update({
      ...orderData,
      user,
      products,
      shipping: {
        ...shipping,
        expected_ship_date: new Date(Date.now() + this.shippingMethods[shipping.method].day * 24 * 60 * 60 * 1000),
      },
    }); 
  }
}

export default new OrderService();
