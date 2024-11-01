// import { Resource } from '#lib';
// export default class WishlistResource extends Resource {
//   transform(wishlist) {
//     const { _id, ...rest } = wishlist;
//     return {
//       id: _id,
//       ...rest,
//     };
//   }
// }

import { ProductModel, UserResource, UserService } from '#features';
import { Resource } from '#lib';

export default class WishlistResource extends Resource {
  async transform(wishlist) {
    const { _id, user, products, ...rest } = order;
    const userData = await UserService.getById(user);
    const productList = products.map((product) => product.product);
    const productData = await ProductModel.find({ _id: { $in: productList } }).exec();

    return {
      id: _id,
      ...rest,
      user: await UserResource.make(userData),
      products: productData,
    };
  }
}
