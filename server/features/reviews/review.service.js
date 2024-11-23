import { Service } from '#lib';
import ReviewModel from './review.model.js';

class ReviewService extends Service {
  model = ReviewModel;
  setUserId(userId) {
    this.forceFilter = { user: userId };
  }

  async reviewExistInOrder(orderId, userId) {
    this._checkModel();
    const review = await this.model.findOne({ order: orderId, user: userId });
    return review;
  }

  async update(id, body) {
    this._checkModel();
    const data = Array.isArray(body)
      ? body.map((item) => this.model.filterFillables(item))
      : this.model.filterFillables(body);

    const exists = await this.reviewExistInOrder(data.order, data.user);
    if (exists) {
      id = exists._id;
    }
    if (id) {
      return this.model.findByIdAndUpdate(id, data, { new: true });
    }
    return this.model.create(data);
  }


}

export default new ReviewService();
