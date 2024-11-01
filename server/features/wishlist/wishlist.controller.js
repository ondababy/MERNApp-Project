import { Controller } from '#lib';
import WishlistResource from './wishlist.resource.js';
import WishlistService from './wishlist.service.js';
// import { wishlistCreateRules, wishlistUpdateRules } from './wishlist.validation.js';

class WishlistController extends Controller {
  service = WishlistService;
  resource = WishlistResource;

  store = async (req, res) => {
    const wishlist = await this.service.create(req.body);
    if (!wishlist?.id) return this.error({ res, message: 'Wishlist not created' });

    const resource = await this.resource.make(wishlist);
    this.success({ res, message: 'Product added to wishlist!', resource });
  };

  // getBySlug = async (req, res) => {
  //   const { slug } = req.params;
  //   const data = await this.service.getBySlug(slug);
  //   if (!data?._id) return this.error({ res, message: 'Data not found!' });

  //   const resource = this.resource?.make(data) || data;
  //   this.success({ res, message: 'Data fetched!', resource });
  // };
}
export default new WishlistController();
