import { Schema } from '#lib';
import { ImageSchema } from '#utils';

const Transaction = new Schema({
  name: 'Transaction',
  schema: [
    {
      name: {
        type: String,
        unique: [true, 'Transaction name must be unique'],
        required: [true, 'Transaction name is required'],
      },
      slug: {
        type: String,
      },
      images: [ImageSchema],
    },
    { timestamps: true },
  ],
});

Transaction.statics.fillables = [];
Transaction.statics.hidden = [];

export default Transaction.makeModel();
