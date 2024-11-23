import { Service } from '#lib';
import ReviewModel from './review.model.js';

class ReviewService extends Service {
  model = ReviewModel;

}

export default new ReviewService();
