import { Controller } from '#lib';
import CartResource from './cart.resource.js';
import CartService from './cart.service.js';

class CartController extends Controller {
  service = CartService;
  resource = CartResource;

  getAll = async (req, res) => {
    const meta = await this.service._getMeta(req.query);

    const { user } = req;
    this.service.setUserId(user._id);
    const data = await this.service.paginate(meta).exec();
    const message = data.length ? 'Data collection fetched!' : 'No data found!';

    const resource = this.resource?.collection(data) || data;
    this.success({ res, message, resource, meta: { ...meta, count: data.length } });
  };
  getById = async (req, res) => {};
  store = async (req, res) => {};
  update = async (req, res) => {};
  delete = async (req, res) => {};
}
export default new CartController();
