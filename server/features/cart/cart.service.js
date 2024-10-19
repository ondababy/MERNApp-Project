import { Service } from '#lib';
import CartModel from './cart.model.js';

class CartService extends Service {
  model = CartModel;
  fieldToSlugify = null;
  forceFilter = {};

  setUserId = (userId) => {
    this.forceFilter = { user: userId };
  };
}

export default new CartService();
