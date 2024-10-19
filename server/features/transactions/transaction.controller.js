import { Controller } from '#lib';
import TransactionResource from './transaction.resource.js';
import TransactionService from './transaction.service.js';
import { transactionCreateRules, transactionUpdateRules } from './transaction.validation.js';

class TransactionController extends Controller {
  service = TransactionService;
  resource = TransactionResource;
  rules = {
    create: transactionCreateRules,
    update: transactionUpdateRules,
  };

  getBySlug = async (req, res) => {
    const { slug } = req.params;
    const data = await this.service.getBySlug(slug);
    if (!data?._id) return this.error({ res, message: 'Data not found!' });

    const resource = this.resource?.make(data) || data;
    this.success({ res, message: 'Data fetched!', resource });
  };
}
export default new TransactionController();
