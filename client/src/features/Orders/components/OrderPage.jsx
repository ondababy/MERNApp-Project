import { DatePickerWithRange } from '@custom';
import OrderWrapper from './OrderWrapper';

function OrderPage() {
  return (
    <OrderWrapper title="Manage Orders">
      <DatePickerWithRange />
    </OrderWrapper>
  );
}

export default OrderPage;
