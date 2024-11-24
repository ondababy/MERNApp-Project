import { BarChartComponent, DatePickerWithRange } from '@custom';
import OrderWrapper from './OrderWrapper';

function OrderPage() {
  return (
    <OrderWrapper title="Manage Orders">
      <div className="gap-4 flex flex-col">
        <DatePickerWithRange />
        <BarChartComponent />
      </div>
    </OrderWrapper>
  );
}

export default OrderPage;
