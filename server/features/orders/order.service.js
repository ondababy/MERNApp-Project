import { NotificationService, ProductModel, ProductService, UserService } from '#features';

import { Service } from '#lib';
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
    const productData = await ProductModel.find({ _id: { $in: productList } });
    productData.forEach((product) => {
      const orderProduct = products.find((orderProduct) => orderProduct.product == product.id);
      product.stock -= orderProduct.quantity;
      product.save();
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
    let { 
      user:userId, 
      status,
      order: { id, products, shipping, ...orderData },
     } = data;
    const user = await UserService.getById(userId);
    const updatedOrder = this.model.findOneAndUpdate(
      {_id: id},
      {
        $set: {
          ...orderData,
          status,
          shipping: {
            ...shipping,
            expected_ship_date: new Date(Date.now() + this.shippingMethods[shipping.method].day * 24 * 60 * 60 * 1000),
          },
        },
      },
      { new: true }
    )

    if (!updatedOrder) throw new Error('Order not found');
    if (status === 'shipped') this.manageStock(products);

    console.clear()
    console.log(user.fcmToken)

    if (user.fcmToken){
      NotificationService.sendNotification({
        deviceToken: user.fcmToken,
        title: 'Order Status',
        body: `Your order ${updatedOrder.id} has been ${status}`
      });
    }

    return updatedOrder;

  }
}

export default new OrderService();
