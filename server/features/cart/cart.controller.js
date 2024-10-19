import { Controller } from '#lib';
import CartResource from './cart.resource.js';
import CartService from './cart.service.js';

class CartController extends Controller {
  service = CartService;
  resource = CartResource;

  getAll = async (req, res) => {
    const { user } = req;
    this.service.setUserId(user._id);
    const data = await this.service.getAll();
    this.success({
      res,
      message: 'Data collection fetched!',
      data: {
        user,
        data,
      },
    });
  };
  getById = async (req, res) => {};
  store = async (req, res) => {};
  update = async (req, res) => {};
  delete = async (req, res) => {};
}
export default new CartController();
