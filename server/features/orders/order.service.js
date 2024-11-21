import EmailTemplate from '#common/lib/email-template';
import { NotificationService, ProductModel, ProductService, UserService } from '#features';
import { sendEmail } from '#utils';

import { Service } from '#lib';
import OrderModel from './order.model.js';

class OrderService extends Service {
  model = OrderModel;
  shippingMethods = {
    std: { key: 'std', fee: 100, method: 'Standard', day: 7},
    exp: { key: 'exp', fee: 200, method: 'Express', day: 3},
    smd: { key: 'smd', fee: 300, method: 'Same Day', day: 1},
  }

  setUserId(userId) {
    this.forceFilter = { user: userId };
  }

  async manageStock(products) {
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

  makeAltMessage(order) {
    return `
    <div class="order-summary">
      <h3>Order Summary</h3>
      <ul>
        ${order.products.map((product) => `
          <li>
            ${product.quantity} x ${product.name} - $${product.price}
          </li>
        `).join('')}
      </ul>
      <p>
        Subtotal: $${order.subtotal}
      </p>
      <p>
        Shipping: $${order.shipping.fee}  
      </p>
      <p>
        Total: $${order.total}  
      </p>
    </div>
    `;
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


    if (user.fcmToken){
      const message = `Your order ${id} has been ${status}!`;
      const title = 'Order Status';
      NotificationService.sendNotification({
        deviceToken: user.fcmToken,
        title,
        body: message,
      });
      const altMessage = this.makeAltMessage(updatedOrder);
      sendEmail({
        email: user.email,
        subject: title,
        message:  new EmailTemplate({ userName: user.username, message, altMessage }).generate(),
      })
    }

    return updatedOrder;
  }
}

export default new OrderService();
