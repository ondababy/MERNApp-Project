import { Controller } from '#lib';
import CartResource from './cart.resource.js';
import CartService from './cart.service.js';

class CartController extends Controller {
  service = CartService;
  resource = CartResource;

  getAll = async (req, res) => {
    const { user } = req;
    this.service.setUserId(user._id);

    const meta = await this.service._getMeta(req.query);
    const data = await this.service.paginate(meta).exec();
    const message = data.length ? 'Data collection fetched!' : 'No data found!';

    const resource = this.resource?.collection(data) || data;
    this.success({ res, message, resource, meta: { ...meta, count: data.length } });
  };

  store = async (req, res) => {
    const validData = await this.service.validate(req.body);
    if (validData.error) return this.error({ res, message: 'Invalid data! ' + validData.error });

    let data = await this.service.updateOrCreate(validData, req.user);
    if (!data._id) return this.error({ res, message: 'Invalid data!' });

    const resource = this.resource?.make(data) || data;
    this.success({ res, message: 'Request successful!', resource: data });
  };

  delete = async (req, res) => {
    const data = await this.service?.delete(req.params.id);
    if (!data?._id) return this.error({ res, message: 'Data not found!' });

    this.success({ res, message: 'Data deleted!' });
  };
}
export default new CartController();
