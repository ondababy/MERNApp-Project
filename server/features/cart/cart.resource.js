import { Resource } from '#lib';
export default class CartResource extends Resource {
  transform(cart) {
    const { _id, ...rest } = cart;
    return {
      id: _id,
      ...rest,
    };
  }
}
