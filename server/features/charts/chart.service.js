import { Service } from '#lib';

class ChartService extends Service {
  shortMonths = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  async monthlyRevenue(data) {
    let data = this.shortMonths.map((month) => ({ name: month, total: Math.floor(Math.random() * 5000) + 1000 }));
    




    return data;
  } 

}

export default new ChartService();
