import { ProductModel } from '#features';
import { Schema } from '#lib';
import { ImageSchema } from '#utils';

const reviewSchema = new Schema({
  name: 'Review',
  schema: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      order: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required: true
      },
      title: {
        type: String,
        default: ''
      },
      rating: {
        type: Number,
        required: [true, 'Please provide a rating'],
        min: 1,
        max: 10,
        validate: {
          validator: Number.isInteger,
          message: 'Rating must be an interger between 1 and 10'
        }
      },
      description: {
        type: String,
        default: '',
      },
      isAnonymous: {
        type: Boolean,
        default: false
      },
    images: [ImageSchema]
    },
    { timestamps: true }
  ],
});

// pre delete
Review.pre('delete', async function (next) {
  const review = this;
  const order = await OrderModel.findById(review.order);
  if (!order) {
    return next(new Error('Order not found'));
  }
  order.review = null;
  order.save();

  const products = await ProductModel.find({ _id: { $in: order.products.map(p=>p.product) } });
  products.forEach((product) => {
    if (!product.reviews.includes(mongoose.Types.ObjectId(review._id))) {
      product.reviews = product.reviews.filter((r) => r.toString() !== review._id.toString());
      product.save();
    }
  });
});



export default reviewSchema.makeModel();
