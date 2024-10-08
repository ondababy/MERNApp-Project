import { Schema } from '#lib';
import { imageSchema } from '#utils';

const Product = new Schema({
  name: 'Product',
  schema: [
    {
      name: {
        type: String,
        unique: [true, 'Product name must be unique'],
        required: [true, 'Product name is required'],
      },
      slug: {
        type: String,
      },
      image: [{ imageSchema }],
    },
    { timestamps: true },
  ],
});

Product.statics.fillables = [];
Product.statics.hidden = [];

export default Product.makeModel();
