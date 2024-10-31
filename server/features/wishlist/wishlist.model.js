import { Schema } from '#lib';
import { ImageSchema } from '#utils';

const Wishlist = new Schema({
  name: 'Wishlist',
  schema: [
    {
      name: {
        type: String,
        unique: [true, 'Wishlist name must be unique'],
        required: [true, 'Wishlist name is required'],
      },
      slug: {
        type: String,
      },
      images: [ImageSchema],
    },
    { timestamps: true },
  ],
});

Wishlist.statics.fillables = [];
Wishlist.statics.hidden = [];

export default Wishlist.makeModel();
