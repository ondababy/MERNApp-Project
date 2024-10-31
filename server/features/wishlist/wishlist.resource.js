import { Resource } from '#lib';
export default class WishlistResource extends Resource {
  transform(wishlist) {
    const { _id, ...rest } = wishlist;
    return {
      id: _id,
      ...rest,
    };
  }
}
