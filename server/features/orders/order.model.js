import { Schema } from '#lib';
import { ImageSchema } from '#utils';

const Order = new Schema({
  name: 'Order',
  schema: [
    {
      name: {
        type: String,
        unique: [true, 'Order name must be unique'],
        required: [true, 'Order name is required'],
      },
      slug: {
        type: String,
      },
      images: [ImageSchema],
    },
    { timestamps: true },
  ],
});

Order.statics.fillables = [];
Order.statics.hidden = [];

export default Order.makeModel();
