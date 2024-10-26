import { Schema } from '#lib';

const Order = new Schema({
  name: 'Order',
  schema: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] },
      total: { type: Number, default: 0 },
      note: { type: String, default: '' },

      products: [
        {
          product: { type: Schema.Types.ObjectId, ref: 'Product' },
          quantity: { type: Number, default: 1 },
        },
      ],
      payment: {
        method: { type: String, default: 'cod', enum: ['cod', 'paypal', 'stripe'] },
        status: { type: String, default: 'pending', enum: ['pending', 'paid', 'failed'] },
      },
      shipping: {
        method: { type: String, default: 'std', enum: ['std', 'exp', 'smd'] },
        address: { type: String, required: true },
        start_ship_date: { type: Date, default: Date.now },
        expected_ship_date: { type: Date, default: Date.now },
        shipped_date: { type: Date, default: Date.now },
      },
    },
    { timestamps: true },
  ],
});

Order.statics.fillables = [];
Order.statics.hidden = [];

export default Order.makeModel();
