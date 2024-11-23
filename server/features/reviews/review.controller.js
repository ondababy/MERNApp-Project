import { Controller } from '#lib';
import ReviewResource from './review.resource.js';
import ReviewService from './review.service.js';
import { reviewCreateRules, reviewUpdateRules } from './review.validation.js';

class ReviewController extends Controller {
  service = ReviewService;
  resource = ReviewResource;

    rules = {
    create: reviewCreateRules,
    update: reviewUpdateRules,
  };

}

export default new ReviewController();
