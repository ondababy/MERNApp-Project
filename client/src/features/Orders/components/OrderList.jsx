import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useOrderActions } from '../hooks/useOrderActions';
import { paymentMethods, setOrder, shippingMethods } from '../order.slice';
import OrderCard from './OrderCard';

const badgeColor = {
  pending: 'bg-yellow-500',
  processing: 'bg-blue-500',
  shipped: 'bg-green-500',
  delivered: 'bg-green-500',
  cancelled: 'bg-red-500',
};
const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export default function OrderList() {
  const { userInfo } = useSelector((state) => state.auth);
  const { fetchOrders, handleCancel } = useOrderActions({ action: 'edit' });
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const q = {
      status: selectedTab === 'All' ? undefined : selectedTab,
    };
    fetchOrders().then((res) => {
      if (selectedTab.toLowerCase() !== 'all') {
        res = res.filter((order) => order.status.toLowerCase() === selectedTab.toLowerCase());
      }
      setOrders(res);
    });
    setSelectedOrder(null);
  }, [selectedTab]);

  const onCancel = () => {
    Swal.fire({
      title: 'Are you sure you want to cancel this order?',
      showDenyButton: true,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancel({ order: selectedOrder, user: userInfo.id }).then(() => {
          fetchOrders().then((res) => {
            if (selectedTab.toLowerCase() !== 'all') {
              res = res.filter((order) => order.status.toLowerCase() === selectedTab.toLowerCase());
            }
            setOrders(res);
          });
          setSelectedOrder(null);
        });
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-2 lg:flex-row justify-center min-h-screen ">
      <div className="w-full p-8 lg:w-3/2 flex flex-col gap-2 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div role="tablist" className="tabs tabs-boxed">
            {tabs.map((status, idx) => (
              <button
                key={`${status}${idx}${Math.random()}`}
                role="tab"
                className={`tab tab-lifted ${selectedTab === status ? 'tab-active' : ''}`}
                onClick={() => setSelectedTab(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div className="divider"></div>
        {/* Card lists */}
        {!orders.length ? (
          <div className="flex justify-center items-center h-64">No orders found</div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order._id} order={order} onClick={() => setSelectedOrder(order)} />
          ))
        )}
      </div>

      {/* Selected Order will show the information here */}
      <div
        className={`${selectedOrder?.id ? 'w-full animate__animated animate__fadeInRight' : 'hidden'
          } p-8 lg:w-2/5 flex flex-col gap-2 `}
      >
        {selectedOrder ? (
          <>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold uppercase text-md">Order ID: {selectedOrder.id}</h1>
              <p>Placed on {new Date(selectedOrder.createdAt).toDateString()}</p>
              <div className="divider"></div>

              {/* Detailed ProductList with quantity shipping and payment */}
              <div>
                <h2 className="text-lg font-bold">Products</h2>
                <ul>
                  {selectedOrder.products.map((product) => (
                    <li key={product._id} className="flex justify-between">
                      <span>
                        {product.name} (x {selectedOrder.quantities[product._id]})
                      </span>
                      <span>${product.price}</span>
                    </li>
                  ))}
                </ul>
                <div className="divider"></div>
                <h2 className="text-lg font-bold">Shipping</h2>
                <p>{shippingMethods[selectedOrder?.shipping?.method].method}</p>
                <div className="divider"></div>
                <h2 className="text-lg font-bold">Payment</h2>
                <p>{paymentMethods[selectedOrder?.payment?.method].method}</p>
                <div className="divider"></div>
                <h1 className="font-bold text-xl mb-2">Total: ${selectedOrder.total}</h1>
                <div className="divider"></div>
              </div>
              {selectedOrder.status === 'pending' && (
                <div className="btn btn-error btn-outline w-full" onClick={onCancel}>
                  Cancel Order
                </div>
              )}
              {selectedOrder.status === 'delivered' && (
                <div className="btn btn-info btn-outline w-full">
                  Comment
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-64">Select an order to view</div>
        )}
      </div>
    </div>
  );
}