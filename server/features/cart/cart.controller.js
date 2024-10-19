import { Controller } from '#lib';
import CartResource from './cart.resource.js';
import CartService from './cart.service.js';
import { cartCreateRules, cartUpdateRules } from './cart.validation.js';

class CartController extends Controller {
  service = CartService;
  resource = CartResource;
  rules = {
    create: cartCreateRules,
    update: cartUpdateRules,
  };

  getBySlug = async (req, res) => {
    const { slug } = req.params;
    const data = await this.service.getBySlug(slug);
    if (!data?._id) return this.error({ res, message: 'Data not found!' });

    const resource = this.resource?.make(data) || data;
    this.success({ res, message: 'Data fetched!', resource });
  };
}
export default new CartController();
