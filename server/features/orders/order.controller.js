import { Controller } from '#lib';
import OrderResource from './order.resource.js';
import OrderService from './order.service.js';
import { orderCreateRules, orderUpdateRules } from './order.validation.js';

class OrderController extends Controller {
  service = OrderService;
  resource = OrderResource;
  rules = {
    create: orderCreateRules,
    update: orderUpdateRules,
  };

  getBySlug = async (req, res) => {
    const { slug } = req.params;
    const data = await this.service.getBySlug(slug);
    if (!data?._id) return this.error({ res, message: 'Data not found!' });

    const resource = this.resource?.make(data) || data;
    this.success({ res, message: 'Data fetched!', resource });
  };
}
export default new OrderController();
