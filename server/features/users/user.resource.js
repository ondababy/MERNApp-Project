import { Resource } from '#lib';
import UserModel from './user.model.js';
export default class UserResource extends Resource {
  async transform(user) {
    const userData = UserModel.filterHidden(user);
    return {
      ...userData,
      id: user._id,
      createdAt: this.formatDate(user.createdAt),
    };
  }
}
