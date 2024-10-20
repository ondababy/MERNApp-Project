import { Service } from '#lib';
import OrderModel from './order.model.js';

class OrderService extends Service {
  model = OrderModel;
  fieldToSlugify = 'name';

  async getBySlug(slug) {
    this._checkModel();
    return this.model.findOne({ slug });
  }
}

export default new OrderService();
