import admin from '#firebase/utils';
import { Service } from '#lib';
import NotificationModel from './notification.model.js';

class NotificationService extends Service {
  model = NotificationModel;

  async saveDevice({ user, fcmToken }) {}

  async sendNotification({deviceToken, title = '', body='' }) {
    const message = {
      notification: {
        title, body
      },
      token: deviceToken
    }

    try {
      const res = await admin.messaging().send(message);
      return res;
    } catch (e) {
      if (e.code === 'app/invalid-credential') {
        throw new Error('Failed to send notification due to invalid credentials. Please check your Firebase configuration.');
      } else if (e.message.includes('getaddrinfo EAI_AGAIN')) {
        throw new Error('Network error while sending notification. Please check your internet connection.');
      } else {
        throw e;
      }
    }
  }
  
  async sendNotifications() {}
}

export default new NotificationService();
