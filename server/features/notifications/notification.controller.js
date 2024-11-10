import { Controller } from '#lib';
import NotificationResource from './notification.resource.js';
import NotificationService from './notification.service.js';

class NotificationController extends Controller {
  service = NotificationService;
  resource = NotificationResource;
  
  sendNotification = async (req, res) => {
    const result = await this.service.sendNotification(req.body);

    this.success({
      res,
      message: "Notification sent.",
      success: true
    })

  }


}
export default new NotificationController();
