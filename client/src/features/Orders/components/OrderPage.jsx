import { DatePickerWithRange, LineChartComponent } from '@custom';
import OrderWrapper from './OrderWrapper';

function OrderPage() {
  return (
    <OrderWrapper title="Manage Orders">
      <div className="gap-4 flex flex-col">
        <DatePickerWithRange />
        <LineChartComponent />
      </div>
    </OrderWrapper>
  );
}

export default OrderPage;
