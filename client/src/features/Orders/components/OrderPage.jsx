import { DatePickerWithRange, RecentSales } from '@custom';
import { MonthlyRevenue } from '@features';
import OrderWrapper from './OrderWrapper';

function OrderPage() {
  return (
    <OrderWrapper title="Manage Orders">
      <div className="w-full gap-4 flex flex-col">
        <DatePickerWithRange />
        <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <MonthlyRevenue className="lg:col-span-4" />
          <RecentSales className="lg:col-span-3" />
        </div>
      </div>
    </OrderWrapper>
  );
}

export default OrderPage;
