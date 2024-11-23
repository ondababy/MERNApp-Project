import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOrderActions } from '../hooks/useOrderActions';
import { paymentMethods, setOrder, shippingMethods } from '../order.slice';

import { ReviewModal } from '@features';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
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
    <div className="w-full flex flex-col gap-2 lg:flex-row lg:justify-center min-h-screen ">
      <div className="w-full p-8 lg:w-3/2 flex flex-col gap-2 ">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full overflow-auto">
          <h1 className="text-2xl font-bold">Orders</h1>
          <div role="tablist" className="tabs tabs-boxed tabs-xs lg:tabs-md">
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
          } p-8 lg:w-2/5 flex flex-col gap-2 lg:relative fixed bg-base-100 h-screen top-0 shadow-lg z-[1002]`}
      >
        {selectedOrder ? (
          <>
            <div className="flex flex-col gap-2">
              <div className='flex justify-between items-center'>
                <span>
                  <h1 className="font-bold uppercase text-md">Order ID: </h1>
                  <span>{selectedOrder.id}</span>
                </span>
                <button className='btn btn-ghost aspect-square rounded-full' onClick={() => setSelectedOrder(null)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
              <p>Placed on {new Date(selectedOrder.createdAt).toDateString()}</p>
              <div className="divider"></div>

              {/* Detailed ProductList with quantity shipping and payment */}
              <div>
                <h2 className="text-lg font-bold">Products</h2>
                <ul>
                  {selectedOrder.products.map((product) => {
                    const qty = selectedOrder.quantities.filter((qty) => Object.keys(qty)[0] === product._id)[0][product._id];
                    return (
                      <li key={product._id} className="flex justify-between">
                        <span className="flex gap-2">
                          <Link to={`/shop/${product?.slug}`} className='link link-hover link-secondary'>{product.name}</Link>
                          <span>(x {qty})</span>
                        </span>
                        <span>{parseFloat(product.price * qty)?.toFixed(2)}</span>
                      </li>
                    )
                  })}
                </ul>
                <div className="divider"></div>
                <h2 className="text-lg font-bold">Shipping</h2>
                <span className="flex items-center justify-between">
                  <p>{shippingMethods[selectedOrder?.shipping?.method].method}</p>
                  <p>{shippingMethods[selectedOrder?.shipping?.method].fee}</p>
                </span>
                <div className="divider"></div>
                <h2 className="text-lg font-bold">Payment</h2>
                <p>{paymentMethods[selectedOrder?.payment?.method].method}</p>
                <div className="divider"></div>
                <h1 className="font-bold text-xl mb-2">Total: {selectedOrder.total}</h1>
                <div className="divider"></div>
              </div>
              {selectedOrder.status === 'pending' && (
                <div className="btn btn-error btn-outline w-full" onClick={onCancel}>
                  Cancel Order
                </div>
              )}



              {/* MODAL FEEDBACK */}
              {selectedOrder?.status === 'delivered' && (
                <ReviewModal refresh={()=>setSelectedOrder(setSelectedOrder)} order={selectedOrder} id={selectedOrder?.review?.id} action={selectedOrder?.review?.id ? 'edit' : 'create'} />
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