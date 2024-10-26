import React from 'react';
import OrderForm from './OrderForm';
import OrderWrapper from './OrderWrapper';

export default function OrderFormPage({ title = 'Order Form' }) {
  return (
    <OrderWrapper
      title={title}
      prevUrl="/dashboard/orders/table"
    >
      <OrderForm />
    </OrderWrapper>
  )
}
