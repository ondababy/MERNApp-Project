import { Controller } from '#lib';
import OrderResource from './order.resource.js';
import OrderService from './order.service.js';

class OrderController extends Controller {
  service = OrderService;
  resource = OrderResource;

  store = async (req, res) => {
    console.log('Request: ', req.body);
    this.success({res, message:'Order debuggineg...', resource: req.body});
  }
  update = async (req, res) => {
    console.log('Request: ', req.body);
    this.success({res, message:'Order debuggineg...', resource: req.body});
  }


}
export default new OrderController();
