import admin from '#firebase/utils';
import { Service } from '#lib';
import NotificationModel from './notification.model.js';

class NotificationService extends Service {
  model = NotificationModel;

  async sendNotification({deviceToken, title, body, type='info'}) {
    const message = {
      notification: {
        title, body, type
      },
      token: deviceToken
    }

    try {
      const res = await admin.messaging().send(message);
      return res;
    } catch (e) {
      throw e
    }
  }
  
  async sendNotifications() {}
  


}

export default new NotificationService();
