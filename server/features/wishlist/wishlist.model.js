import { Schema } from '#lib';
import { ImageSchema } from '#utils';

const Wishlist = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  products: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Product',
  }],
}, {
  timestamps: true,
});

Wishlist.statics.fillables = [];
Wishlist.statics.hidden = [];

export default Wishlist.makeModel();
