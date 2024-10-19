import { Service } from '#lib';
import CartModel from './cart.model.js';

class CartService extends Service {
  model = CartModel;
  fieldToSlugify = 'name';

  async getBySlug(slug) {
    this._checkModel();
    return this.model.findOne({ slug });
  }
}

export default new CartService();
