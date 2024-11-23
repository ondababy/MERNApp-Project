import { Schema } from '#lib';
import { ImageSchema } from '#utils';
import { Filter } from 'bad-words';
import customBadWords from './customBadWords.js';

const filter = new Filter();
filter.addWords(...customBadWords);

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
        default: '',
        validate: {
          validator: (value) => !filter.isProfane(value),
          message: 'Title contains bad words'
        }
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
        validate: {
          validator: (value) => !filter.isProfane(value),
          message: 'Review contains bad words'
        }
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
