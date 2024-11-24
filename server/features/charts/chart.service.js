import { OrderModel, OrderResource } from '#features';
import { Service } from '#lib';

class ChartService extends Service {
  shortMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  async monthlyRevenue(data) {
    data = this.shortMonths.map((month) => ({ month: month, revenue: Math.floor(Math.random() * 5000) + 1000 }));
    const orders = await OrderModel.find({}).exec();
    const orderResource = await OrderResource.collection(orders);
    const monthlyRevenue = orderResource.reduce((acc, order) => {
      const month = new Date(order.createdAt).getMonth();
      acc[month] = acc[month] ? acc[month] + order.total : order.total;
      return acc;
    }, {});
    data = this.shortMonths.map((month, index) => ({ month, revenue: monthlyRevenue[index] || 0 }));


    return data;
  } 

}

export default new ChartService();
