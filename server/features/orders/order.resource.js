import { ProductModel, ReviewModel, ReviewResource, UserResource, UserService } from '#features';
import { Resource } from '#lib';

export default class OrderResource extends Resource {
  async transform(order) {
    const { _id, user, products, review=null, ...rest } = order;
    const userData = await UserService.getById(user);
    const productList = products.map((product) => product.product);
    const productData = await ProductModel.find({ _id: { $in: productList } }).exec();
    const reviewData = review ? await ReviewModel.findById(review).exec() : null;

    return {
      id: _id,
      ...rest,
      user: await UserResource.make(userData),
      review: review ? await ReviewResource.make(reviewData) : null,
      products: productData,
      quantities: products.map((product) => ({[product.product]: product.quantity})),
      subTotal: productData.reduce((acc, product, index) => acc + product.price * products[index].quantity, 0),
    
    };
  }
}
