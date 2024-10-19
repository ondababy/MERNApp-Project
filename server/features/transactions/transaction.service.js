import { Service } from '#lib';
import TransactionModel from './transaction.model.js';

class TransactionService extends Service {
  model = TransactionModel;
  fieldToSlugify = 'name';

  async getBySlug(slug) {
    this._checkModel();
    return this.model.findOne({ slug });
  }
}

export default new TransactionService();
