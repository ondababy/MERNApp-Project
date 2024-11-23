import { Controller } from '#lib';
import ProductResource from './product.resource.js';
import ProductService from './product.service.js';
import { productCreateRules, productUpdateRules } from './product.validation.js';
import ProductModel from './product.model.js';  // Ensure you import ProductModel here

class ProductController extends Controller {
  service = ProductService;
  resource = ProductResource;
  rules = {
    create: productCreateRules,
    update: productUpdateRules,
  };

  // Method to get product by slug
  getBySlug = async (req, res) => {
    const { slug } = req.params;
    const data = await this.service.getBySlug(slug);
    if (!data?._id) return this.error({ res, message: 'Data not found!' });

    const resource = (await this.resource?.make(data)) || data;
    this.success({ res, message: 'Data fetched!', resource });
  };
  
  // Method to store a new product
  store = async (req, res) => {
    let validData = req.body;
    if (!this.rules.create.length) validData = await this.validator(req, res, this.rules.create);

    if (!validData.brand || !validData.supplier) {
      return this.error({ res, message: 'Brand and Supplier are required!' });
    }

    let data = await this.service?.create(validData);
    if (!data._id) return this.error({ res, message: 'Invalid data!' });

    if (req.file || req.files || this.service.hasField('images')) {
      const images = this.addImage(req);
      data.images = [...(data.images || []), ...images];
      await data.save();
    }

    const resource = (await this.resource?.make(data)) || data;
    this.success({ res, message: 'Data created!', resource });
  };

  // Method to update an existing product
  update = async (req, res) => {
    let validData = req.body;
    if (!this.rules.update.length) validData = await this.validator(req, res, this.rules.update);

    if (!validData.brand || !validData.supplier) {
      return this.error({ res, message: 'Brand and Supplier are required!' });
    }

    const data = await this.service?.update(req.params.id, validData);
    if (!data._id) return this.error({ res, message: 'Invalid data!' });

    if (req.file || req.files || this.service.hasField('images')) {
      const images = this.addImage(req);
      const oldImages = new Set((data.images || []).map((image) => image.public_id));
      const newImages = images.filter((image) => !oldImages.has(image.public_id));
      data.images = [...(data.images || []), ...newImages];
      await data.save();
    }

    const resource = (await this.resource?.make(data)) || data;
    this.success({ res, message: 'Data updated!', resource });
  };

  // Charts
  productSales = async (req, res) => {
    try {
      const totalSales = await Order.aggregate([
        {
          $unwind: '$products',
        },
        {
          $lookup: {
            from: 'products', // Matches the collection name of the Product model
            localField: 'products.product',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $unwind: '$productDetails',
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: {
                $multiply: ['$products.quantity', '$productDetails.price'],
              },
            },
          },
        },
      ]);
  
      if (!totalSales.length || totalSales[0].total === 0) {
        return res.status(404).json({ message: 'No total sales data found!' });
      }

      const sales = await Order.aggregate([
        {
          $unwind: '$products',
        },
        {
          $lookup: {
            from: 'products',
            localField: 'products.product',
            foreignField: '_id',
            as: 'productDetails',
          },
        },
        {
          $unwind: '$productDetails',
        },
        {
          $group: {
            _id: '$productDetails.name', // Group by product name
            total: {
              $sum: {
                $multiply: ['$products.quantity', '$productDetails.price'],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            name: '$_id',
            total: 1,
          },
        },
      ]);
  
      if (!sales.length) {
        return res.status(404).json({ message: 'No sales data found!' });
      }

      const totalAmount = totalSales[0].total;
      const totalPercentage = sales.map((item) => ({
        name: item.name,
        percent: Number(((item.total / totalAmount) * 100).toFixed(2)),
      }));
  
      // Step 4: Send response
      return res.status(200).json({
        success: true,
        totalPercentage,
        sales,
        totalSales: totalAmount,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };  
}

export default new ProductController();
