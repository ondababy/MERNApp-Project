import { Service } from '#lib';
import WishlistModel from './wishlist.model.js';

class WishlistService extends Service {
  model = WishlistModel;
  fieldToSlugify = 'name';

  async getBySlug(slug) {
    this._checkModel();
    return this.model.findOne({ slug });
  }
}

export default new WishlistService();
