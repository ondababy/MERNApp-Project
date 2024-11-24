import { Controller } from '#lib';
import ChartService from './chart.service.js';

class ChartController extends Controller {
  service = ChartService;

  monthlyRevenue = async (req, res) => {
    const data = await this.service.monthlyRevenue();
    this.success({ res, message: 'Data fetched!', resource: data });
  };
  
}
export default new ChartController();
