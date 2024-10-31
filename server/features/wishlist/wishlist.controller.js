import { Controller } from '#lib';
import WishlistResource from './wishlist.resource.js';
import WishlistService from './wishlist.service.js';
import { wishlistCreateRules, wishlistUpdateRules } from './wishlist.validation.js';

class WishlistController extends Controller {
  service = WishlistService;
  resource = WishlistResource;
  rules = {
    create: wishlistCreateRules,
    update: wishlistUpdateRules,
  };

  getBySlug = async (req, res) => {
    const { slug } = req.params;
    const data = await this.service.getBySlug(slug);
    if (!data?._id) return this.error({ res, message: 'Data not found!' });

    const resource = this.resource?.make(data) || data;
    this.success({ res, message: 'Data fetched!', resource });
  };
}
export default new WishlistController();
