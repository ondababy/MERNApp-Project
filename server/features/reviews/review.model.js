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

export default reviewSchema.makeModel();
