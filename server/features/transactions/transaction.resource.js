import { Resource } from '#lib';
export default class TransactionResource extends Resource {
  transform(transaction) {
    const { _id, ...rest } = transaction;
    return {
      id: _id,
      ...rest,
    };
  }
}
