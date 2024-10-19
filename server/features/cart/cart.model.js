import { Schema } from '#lib';
import { ImageSchema } from '#utils';

const Cart = new Schema({
  name: 'Cart',
  schema: [
    {
      name: {
        type: String,
        unique: [true, 'Cart name must be unique'],
        required: [true, 'Cart name is required'],
      },
      slug: {
        type: String,
      },
      images: [ImageSchema],
    },
    { timestamps: true },
  ],
});

Cart.statics.fillables = [];
Cart.statics.hidden = [];

export default Cart.makeModel();
