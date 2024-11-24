import { BrandModel, CategoryModel, ReviewModel, SupplierModel } from '#features';
import { Resource } from '#lib';

export default class ProductResource extends Resource {
  async transform(product) {
    if (!product?._id) return null;
    const { 
      _id, 
      category, 
      brand, 
      supplier, 
      reviews,
      ...rest 
    } = product;

    const categoryDetails = await CategoryModel.findById(category).select('name _id');
    const brandDetails = await BrandModel.findById(brand).select('name _id');
    const supplierDetails = await SupplierModel.findById(supplier).select('name _id');
    const reviewsData = await ReviewModel.find({ _id: { $in: reviews } }).select('rating');
    const averageRating = reviewsData.reduce((acc, review) => acc + review.rating, 0) / reviewsData.length;

    return {
      ...rest,
      id: _id,
      category: categoryDetails ? categoryDetails.name : null,
      brand: brandDetails ? brandDetails.name : null,
      supplier: supplierDetails ? supplierDetails.name : null,
      numOfReviews: reviews.length,
      price: rest.price.toFixed(2),



    };
  }
}
