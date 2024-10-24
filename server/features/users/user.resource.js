import { Resource } from '#lib';
import UserInfo from './user-info.model.js';
import UserModel from './user.model.js';
export default class UserResource extends Resource {
  async transform(user) {
    const userData = UserModel.filterHidden(user);
    const userInfo = await UserInfo.findById(userData.info);
    return {
      ...userData,
      id: user._id,
      info: userInfo,
      createdAt: this.formatDate(user.createdAt),
    };
  }
}
