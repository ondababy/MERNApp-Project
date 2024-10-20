import { Controller } from '#lib';
import CartResource from './cart.resource.js';
import CartService from './cart.service.js';

class CartController extends Controller {
  service = CartService;
  resource = CartResource;

  getAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const documentCount = await this.service?.model.countDocuments();
    const last_page = Math.ceil(documentCount / limit);
    if (page > last_page) req.query.page = last_page;

    const { user } = req;
    this.service.setUserId(user._id);
  };
  getById = async (req, res) => {};
  store = async (req, res) => {};
  update = async (req, res) => {};
  delete = async (req, res) => {};
}
export default new CartController();
