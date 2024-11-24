import { BrandModel, CategoryModel, SupplierModel } from '#features';
import { Service } from '#lib';
import ProductModel from './product.model.js';
import OrderModel from '../orders/order.model.js';

class ProductService extends Service {
  model = ProductModel;
  fieldToSlugify = 'name';

  async getProductStocks() {
    return await this.model.find({}).select('name stock'); // Fetch only 'name' and 'stock'
  }
  
  
  async getProductSales() {
    return await OrderModel.aggregate([
      // Unwind the 'products' array to get each product's details
      {
        $unwind: '$products',
      },
      // Join with the 'products' collection to get product details
      {
        $lookup: {
          from: 'products', // The collection name in MongoDB should be 'products'
          localField: 'products.product', // Field in Order that references Product
          foreignField: '_id', // Match Product _id
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails', // Unwind the productDetails array after $lookup
      },
      {
        $group: {
          // Group by product name and calculate total sales
          _id: '$productDetails._id', // Group by product ID
          name: { $first: '$productDetails.name' }, // Get the product name
          total: {
            $sum: {
              $multiply: ['$products.quantity', '$productDetails.price'], // Total sales per product (quantity * price)
            },
          },
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id from the result
          name: 1, // Include product name
          total: 1, // Include total sales for each product
        },
      },
    ]);
  }

  async filterProducts(filter, meta) {
    this._checkModel();
    const { filters, ...rest } = filter;

    const priceQuery = filters.price.map(p=>({price: rest.priceRanges[p]}));

    const query = {
      $or: [
        { ratings: { $gte: filters.rating } },
        ...priceQuery,
        { price: filter.range },
        { name: { $in: filters.categories } },
      ],
      name: { $regex: filter.categorySearch, $options: 'i' },
    };


    this.query = this.model.find(query);;
    return this.paginate(meta).exec();
    
  }


  async getCategoryId(name) {
    const category = await CategoryModel.findOne({ name });
    if (!category) throw new Error('Category not found');
    return category._id;
  }

  async getBrandId(name) {
    const brand = await BrandModel.findOne({ name });
    if (!brand) throw new Error('Brand not found');
    return brand._id;
  }

  async getSupplierId(name) {
    const supplier = await SupplierModel.findOne({ name });
    if (!supplier) throw new Error('Supplier not found');
    return supplier._id;
  }

  async getBySlug(slug) {
    this._checkModel();
    return this.model.findOne({ slug });
  }
}

export default new ProductService();
